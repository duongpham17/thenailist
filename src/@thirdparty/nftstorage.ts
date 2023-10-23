import { NFTStorage } from 'nft.storage';

const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU3YmE4ZGRBZDM4RDc2NGQ2RDBlZDNlQzZhQTJhRDlGMDk2ZTY0NzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDUzMzUxOTUyNywibmFtZSI6ImVkZGllIn0.OJdLHU2LHe9Wb1vjWzcyn0zadbunuXljNmDFFutXI4U";

export const upload = async (image: any): Promise<{ url: string; ipfs: string}> => {
    const storage = new NFTStorage({ token: api_key || "" });
    const blob = new Blob([image]);
    const cid = await storage.storeBlob(blob);
    return {
        ipfs: cid,
        url: `https://${cid}.ipfs.nftstorage.link`,
    }
};

export const remove = async (cid: string): Promise<void> => {
    try{
        const storage = new NFTStorage({ token: api_key || "" });
        await storage.delete(cid);
    } catch(err: any){
        console.log(err.response)
    }
};