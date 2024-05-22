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
    } catch (error: any) {}
  }

  async isLoggedIn() {}

  async getCurrentUser() {}

  async logout() {}
}
