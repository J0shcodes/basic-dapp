import moodABI from "./contract.abi.json" assert { type: "json" };

const contractAddress = "0x9c09EcC74053815188CE6A788b7c9D3aca0E5995";
let moodContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    moodContract = new ethers.Contract(contractAddress, moodABI, signer);
  });
});

async function getMood() {
    let Mood;
    const getMoodPromise = moodContract.getMood();
    Mood = await getMoodPromise;
    console.log(Mood);
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = moodContract.setMood(mood);
    await setMoodPromise;
}

document.getElementById("getMood").addEventListener("click", () => {
    getMood();
})

document.getElementById("setMood").addEventListener("click", () => {
    setMood();
})

console.log(moodABI);
