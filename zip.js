import { zip } from "zip-a-folder";
import { moveFile } from "move-file";

await zip("dist", "dist.zip");
console.log("The file has been created");

await moveFile("dist.zip", "dist/dist.zip");
console.log("The file has been moved");
