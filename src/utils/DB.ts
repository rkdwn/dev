type UserInfo = {
  id: string;
  username: string;
  userId: string;
  mealType: ScalarMealType;
  wantToReserve: boolean;
};

type Response = {
  result: boolean;
  data?: any;
  errorCode?: string;
  message?: string;
};

class DB {
  private db: IDBDatabase | null = null;

  constructor() {}

  public async open(): Promise<Response> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        window.alert("indexedDB를 지원하지 않는 브라우저입니다.");
        resolve({ result: false, message: "not supported indexedDB" });
      }
      const request = window.indexedDB.open("autoMeal");

      // open database named "autoMeal"

      request.onsuccess = (event: Event) => {
        this.db = request.result;
        resolve({ result: true, message: "success" });
      };

      // If there has no DB named "autoMeal", create and initialize it.
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        console.log("# db initialize called");
        this.db = request.result;

        const UserInfo = this.db.createObjectStore("UserInfo", {
          keyPath: "username"
        });
        UserInfo.createIndex("username", "username", { unique: true });
      };

      request.onerror = (event: Event) => {
        console.log("# db error");
        resolve({
          result: false,
          errorCode: "DB_OPEN_ERROR",
          message: "error while opening db"
        });
      };
    });
  }

  public getCurUserInfo = async (): Promise<Response> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        console.log("# error");
        throw new Error("DB not initialized");
      }

      const transaction = this.db.transaction(["UserInfo"], "readonly");
      const store = transaction.objectStore("UserInfo");

      const request = store.getAll();

      request.onsuccess = (event: Event) => {
        if (request.result.length === 0) {
          resolve({
            result: false,
            message: "no user info"
          });
        }
        resolve({
          result: true,
          message: "get user info success",
          data: request.result[0]
        });
      };
    });
  };

  public clearUserInfo = async (): Promise<Response> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        console.log("# error");
        throw new Error("DB not initialized");
      }

      const transaction = this.db.transaction(["UserInfo"], "readwrite");
      const store = transaction.objectStore("UserInfo");

      store.clear();
      resolve({ result: true, message: "clear user info success" });
    });
  };

  public upsertUserInfo = async (params: UserInfo): Promise<Response> => {
    return new Promise((resolve, reject) => {
      const { id, userId, username, mealType, wantToReserve } = params;
      console.log("# check ", params);

      if (!this.db) {
        console.log("# error");
        throw new Error("DB not initialized");
      }

      const transaction = this.db.transaction(["UserInfo"], "readwrite");
      const store = transaction.objectStore("UserInfo");

      store.clear();

      const request = store.put({
        id: id,
        userId: userId,
        username: username,
        mealType: mealType,
        wantToReserve: wantToReserve
      });

      request.onsuccess = (event: Event) => {
        resolve({ result: true, message: "create user info success" });
      };

      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        if (error && error.name === "ConstraintError") {
          console.log("# key already exist");
          resolve({
            result: false,
            errorCode: "DUP_KEY_ERR",
            message: "key already exist"
          });
        }
        if (error) {
          console.log("# error", error);
          resolve({
            result: false,
            errorCode: "DB_CREATE_ERR",
            message: "error while creating user info"
          });
        }
      };
    });
  };
}

export default DB;
export type { UserInfo };
