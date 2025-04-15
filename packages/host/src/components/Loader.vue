<template>
  <div ref="containerRef"></div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, onBeforeUnmount} from 'vue';
import { useRoute } from 'vue-router';
import { useModuleFederation } from '../plugins/federationPlugin';

import routeManifest from '../routeManifest'; // Import the route manifest

/**
 * Represents the configuration for a remote module.
 * This configuration is used to define the name and entry point for a remote module.
 */
export type Remote = {
  /**
   * The name of the micro-frontend application.
   */
  module: string

  /**
   * The entry point for the remote module.
   * If not provided, the entry point is assumed to be the default export of the module.
   */
  entry?: string
}

/**
 * Represents the remote module after its being loaded, containing methods for mounting and unmounting the module.
 */
export type RemoteModule = {
  /**
   * The name of the module.
   */
  name?: string

  /**
   * Mounts the remote module.
   */
  mount: (container: HTMLDivElement | null) => void

  /**
   * Unmounts the remote module. Should be called before mounting a new module.
   */
  unmount: () => void
}

const route = useRoute();
const moduleFederation = useModuleFederation();

// Ref to the container element
const containerRef = ref("containerRef");
// Keep track of the current loaded module
const currentModule = ref(null);

// Function to find the correct MFE based on the current route
const findRouteManifest = (routeName: string) => {
  return routeManifest.find((mfe) => mfe.route.name === routeName);
};

// Function to load and mount the remote micro frontend
const loadRemote = async (mfeConfig: Remote) => {
  // if (mfeConfig.module === currentModule.value?.name) return; // Skip if already loaded
  //
  // if (currentModule.value !== null) currentModule.value.unmount?.(); // Unmount previous MFE

  console.log("qwe")

  try {
    // Load the remote module dynamically via Vite Module Federation
    const remoteModule = await moduleFederation.loadRemote(mfeConfig.module);
    console.log(remoteModule);

    // Mount the remote module into the container
    if (remoteModule?.mount && containerRef.value) {
      console.log("Mounted remote module", remoteModule);
      console.log("on mount", containerRef.value);
      remoteModule.mount(containerRef.value);
    }

    currentModule.value = {
      name: mfeConfig.module,
      mount: remoteModule.mount,
      unmount: remoteModule.unmount,
    } as RemoteModule;
  } catch (error) {
    console.error('Error loading remote module:', error);
  }
};

// Function to initialize the correct micro frontend based on the route
const initializeRemote = () => {
  const routeConfig = findRouteManifest(route.name as string);

  if (!routeConfig) {
    console.error('Route manifest not found for', route.name);
    return;
  }

  const { remote } = routeConfig;
  if (remote?.module) loadRemote(remote);
  console.log("loading remote module", remote.module);
};

// Load micro frontend on component mount and watch for route changes
onMounted(() => {
  initializeRemote();
console.log("Initializing remote module");
  watch(
    () => route.name,
    (newRouteName, oldRouteName) => {
      console.log("Route changed from", oldRouteName, "to", newRouteName);
      if (newRouteName !== oldRouteName) initializeRemote();
    }
  );

  // Cleanup on component unmount
  onBeforeUnmount(() => {
    if (currentModule.value?.unmount) {
      currentModule.value.unmount();
      currentModule.value = null;
    }
  });
});
</script>
