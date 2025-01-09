import { writable } from "svelte/store";
import { launchFullscreen } from "../helpers/launchFullscreen";

export let hideCloudgazer = writable(false);
export let cloudgazerInitiated = writable(false);
export let xprediction = writable();
export let yprediction = writable();

// let GazeCloudAPI = window.GazeCloudAPI;

export function startGazeCloud() {
  launchFullscreen();
  GazeCloudAPI.APIKey = "PD3ZHwEq2cWsFeYK9CJfCIe";
  GazeCloudAPI.StartEyeTracking();
}

export function stopGazeCloud() {
  GazeCloudAPI.StopEyeTracking();
}

