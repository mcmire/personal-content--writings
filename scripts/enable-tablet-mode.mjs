import { Platform } from "obsidian";

export default async (app) => {
  Object.defineProperty(Platform, "isTablet", { 
    get: () => true, 
    set: () => {} 
  });

  Object.defineProperty(Platform, "isPhone", { 
    get: () => false, 
    set: () => {} 
  });

  document.body.classList.add("is-tablet");
  document.body.classList.remove("is-phone");
};
