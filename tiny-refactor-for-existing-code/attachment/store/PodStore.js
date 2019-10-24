import {
  types, getParent, flow, getRoot,
} from 'mobx-state-tree';

import ReviewShipmentService from '../../../services/ReviewShipment.service';

import FilesStore from '../../../../../shared/store/FilesStore';

const PodStore = types.model('PodStore', {
  filesStore: types.optional(FilesStore, {}),
  activeDrop: types.maybeNull(types.number),
}).actions(self => ({
  uploadFiles: (files, onFinish) => {
    self.filesStore.uploadFiles(files, onFinish);
  },

  setActiveDrop: (value) => {
    self.activeDrop = value;
  },

  /**
 * @desc Show messages of success and failure
 */
  showMessage: (message, variant) => {
    const { messageStore } = self.rootStore;
    messageStore.showMessage({
      message,
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      variant, // success error info warning null,
      classes: 'font-bold text-base',
    });
  },

  /**
   * @desc clear the unuploaded files, removes the uploaded files
   */
  shakeFiles: () => {
    self.filesStore.shakeUnUploadedFiles();
  },

  saveFiles: flow(function* SaveFiles(files, dropIndex) {
    try {
      const drop = self.parent.PickDropStore.getDrops[dropIndex];
      self.setActiveDrop(dropIndex);
      const shipment = self.parent.modifiedShipment;
      const userId = self.rootStore.userStore.user.cognitoUserId;
      files.forEach((file, i) => file.setValues({
        shipmentId: shipment.id,
        groupId: drop.id,
        userId,
        sequenceInGroup: i + 1,
        fileType: 'POD',
        fileContentType: file.getFileContentType,
      }));
      const payload = files.map(file => file.toPayload());
      yield ReviewShipmentService.uploadPods(payload);
    } catch (err) {
      self.showMessage(err, 'error');
    }
  }),
})).views(self => ({
  get parent() {
    return getParent(self);
  },
  get rootStore() {
    return getRoot(self);
  },
  get isUploadDisabled() {
    const drop = self.parent.PickDropStore.getDrops[self.activeDrop];
    const dropPermissions = self.parent.permissions.drop.get(drop ? drop.id : '');
    return dropPermissions ? !dropPermissions.podUpload.canWrite() : false;
  },
}));

export default PodStore;
