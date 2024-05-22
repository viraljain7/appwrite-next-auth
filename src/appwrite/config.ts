import conf from "@/conf/config";
import { Client, Databases, ID, Account } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type loginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class appwriteService {
  //create a new record of user inside appwrite

  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async login({ email, password }: loginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const userData = await this.getCurrentUser();
      return Boolean(userData); //it will return true if userData exists else return false
    } catch (error) {}
    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      return await account.deleteSessions("current");
    } catch (error) {
      throw error;
    }
  }
}
export default appwriteService;
