import mongoose from "mongoose";

const Connection = async (username, password) => {
  // const URL = `mongodb://${username}:${password}@ac-w2e8j4n-shard-00-00.zdwn3em.mongodb.net:27017,ac-w2e8j4n-shard-00-01.zdwn3em.mongodb.net:27017,ac-w2e8j4n-shard-00-02.zdwn3em.mongodb.net:27017/?ssl=true&replicaSet=atlas-13jucd-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster1`;

  //const URL = `mongodb://${username}:${password}@ac-ltffijg-shard-00-00.d5zadvx.mongodb.net:27017,ac-ltffijg-shard-00-01.d5zadvx.mongodb.net:27017,ac-ltffijg-shard-00-02.d5zadvx.mongodb.net:27017/?ssl=true&replicaSet=atlas-vkti17-shard-0&authSource=admin&retryWrites=true&w=majority&appName=whatsapp-clone`;

  const URL =
    "mongodb://user:user@ac-qamzfyw-shard-00-00.vq9cvrf.mongodb.net:27017,ac-qamzfyw-shard-00-01.vq9cvrf.mongodb.net:27017,ac-qamzfyw-shard-00-02.vq9cvrf.mongodb.net:27017/?ssl=true&replicaSet=atlas-11i90r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=whatsapp-clone";
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default Connection;
