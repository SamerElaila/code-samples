import { types, getParent, flow } from 'mobx-state-tree';

// TODO BANNA please use the function in the utils UtilFunctions, make changes to the function as needed
// DONE

// initiat shipment details store
const AttachmentStore = types

  .model('documentModel', {})
  .actions(self => ({
    // eslint-disable-next-line func-names
    editDocument: flow(function* (fileId, fileKey, oldFileKey) {
      try {
        const replacedFile = yield self.apiRequests.addBolsRequests.replaceFile(
          fileId,
          fileKey,
        );
        self.rootStore.setFiles(fileId, replacedFile);
        const rootParent = getParent(self.rootStore);
        rootParent.CreateShipmentStore.bolsStore.setUploadedFiles(oldFileKey);
      } catch (error) {
      }
    }),
    reset() {
      self.bol = [];
      self.pod = [];
      self.exception = [];
    },
  }))
  .views(self => ({
    // prepare shipment api instance
    get getBol() {
      return self.getFiles && self.getFiles.filter(file => file.fileType === 'BOL' && file.type === 'pick').map(el => ({
        // eslint-disable-next-line max-len
        id: el.id, friendlyFileName: el.friendlyFileName, createdAt: el.createdAt, fileKey: el.fileKey, indexPickDrop: el.indexPickDrop, type: el.type,
      }));
    },
    get getPod() {
      return self.getFiles && self.getFiles.filter(file => file.fileType === 'POD').map(el => ({
        // eslint-disable-next-line max-len
        id: el.id,
        friendlyFileName: el.friendlyFileName,
        createdAt: el.createdAt,
        fileKey: el.fileKey,
        indexPickDrop: el.indexPickDrop,
        type: el.type,
        userType: el.userType,
      }));
    },
    get getException() {
      return self.getFiles && self.getFiles.filter(file => file.fileType === 'EXCEPTION').map(el => ({
        // eslint-disable-next-line max-len
        id: el.id, friendlyFileName: el.friendlyFileName, createdAt: el.createdAt, fileKey: el.fileKey, indexPickDrop: el.indexPickDrop, type: el.type,
      }));
    },
    get getFiles() {
      return self.rootStore ? self.rootStore.modifiedShipment.files : null;
    },
    get apiRequests() {
      return self.rootStore.apiRequests;
    },
    /**
     * @desc Get drops count from reviewShipmentStore
     */
    get dropsCount() {
      return self.rootStore.getDropsCount;
    },
    get rootStore() {
      return getParent(self);
    },
  }));

export default AttachmentStore;
