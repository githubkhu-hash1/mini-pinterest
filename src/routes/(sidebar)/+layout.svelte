<script lang="ts">
   import "../../app.css";
   import * as Sidebar from "$lib/components/ui/sidebar/index.js";
   import AppSidebar from "$lib/components/app-sidebar/AppSidebar.svelte";
   import { Input } from "$lib/components/ui/input";
   import ChevronDown from "lucide-svelte/icons/chevron-down";
   import { Button } from "$lib/components/ui/button/index.js";
   import Search from "lucide-svelte/icons/search";

   // import { ModeWatcher } from "mode-watcher";

   import { onMount } from "svelte";
   import { session } from "$lib/session";
   import { goto } from "$app/navigation";
   import { signOut } from "firebase/auth";
   import { auth } from "$lib/fireball";
  

   import type { LayoutData, LayoutProps, PageProps } from "./$types";
   let { children, data }: LayoutProps = $props();
   // let { childrens } = $props();

   let loading: boolean = true;
   let loggedIn: boolean = false;

   session.subscribe((cur: any) => {
      loading = cur?.loading;
      loggedIn = cur?.loggedIn;
   });

   onMount(async () => {
      const user: any = await data.getAuthUser();

      const loggedIn = !!user && user?.emailVerified;
      session.update((cur: any) => {
         loading = false;
         return {
            ...cur,
            user,
            loggedIn,
            loading: false,
         };
      });

      if (loggedIn) {
         goto("/");
      } else {
         goto("/login");
      }
   });
</script>




<Sidebar.Provider>
   <AppSidebar />
   <main class="w-full">
      <Sidebar.Trigger />
      {#if loading}
         <div>Loading...</div>
      {:else}
      <div class="flex flex-row w-full p-2 space-x-1">
         <div class="relative h-fit w-full">
            <div
               class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
               <Search />
            </div>
            <Input type="text" placeholder="Search" class="block w-full p-4 ps-10" />
           </div>
         <div>
            <Button variant="outline">Profile</Button>
         </div>
         <div>
            <Button variant="outline" size="icon">
               <ChevronDown class="h-4 w-4" />
            </Button>
         </div>
      </div>
         {@render children()}
      {/if}

   </main>
</Sidebar.Provider>