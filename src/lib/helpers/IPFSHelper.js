
let defaultNode;

export default class IPFSHelper {
  static async connect() {
    if (!defaultNode) {
      defaultNode = await Ipfs.create();
    }
  }

  static getNode() {
    return defaultNode;
  }

  static async add(data) {
    const node = IPFSHelper.getNode();
    return node.add(data);
  }

  static async read(path) {
    const node = IPFSHelper.getNode();
    const stream = node.cat(path)
    let data = '';
    
    for await (const chunk of stream) {
      data += chunk.toString()
    }

    return data;
  }
}