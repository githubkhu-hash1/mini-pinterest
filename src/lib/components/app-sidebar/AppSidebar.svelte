<script lang="ts">
    import House from "lucide-svelte/icons/house";
    import Recent from "lucide-svelte/icons/clock-3";
    import Following from "lucide-svelte/icons/users-round";
    import Settings from "lucide-svelte/icons/settings";
    import Messages from "lucide-svelte/icons/message-square-text";
    import Notifications from "lucide-svelte/icons/bell";
    import { DropdownMenu } from "bits-ui";
    import ChevronUp from "lucide-svelte/icons/chevron-up";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { Button } from "$lib/components/ui/button";
    import { session } from "$lib/session";

    // let myOpen = $state(false);
    // Menu items.
    const items = [
        {
            title: "Home",
            url: "#",
            icon: House,
        },
        {
            title: "Recent",
            url: "#",
            icon: Recent,
        },
        {
            title: "Following",
            url: "#",
            icon: Following,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ];

    const items1 = [
        {
            title: "Messages",
            url: "#",
            icon: Messages,
        },
        {
            title: "Notifications",
            url: "#",
            icon: Notifications,
        },
    ];
</script>

<div>
    <!-- <Sidebar.Root> -->
    <!-- <Sidebar.Provider bind:open={() => myOpen, (newOpen) => (myOpen = newOpen)}> -->
    <Sidebar.Root collapsible="icon" variant="sidebar">
        <Sidebar.Content>
            <Sidebar.Group>
                <Sidebar.Header>
                    <Sidebar.GroupLabel>
                        <img
                            src="https://images.ctfassets.net/h67z7i6sbjau/5zteWRcC1qbgLZoClcMmYl/a0391fdc321eddce7de41152108723b5/Brand_Guidelines_hero_2x.jpg?fm=webp&q=85"
                            alt="@shadcn"
                            class="rounded-sm h-10 w-15"
                        />
                        Pinterest
                    </Sidebar.GroupLabel>
                </Sidebar.Header>

                <Sidebar.GroupContent>
                    <Sidebar.Menu>
                        {#each items as item (item.title)}
                            <Sidebar.MenuItem>
                                <Sidebar.MenuButton>
                                    {#snippet child({ props })}
                                        <a href={item.url} {...props}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        {/each}

                        Insights
                        {#each items1 as item (item.title)}
                            <Sidebar.MenuItem>
                                <Sidebar.MenuButton>
                                    {#snippet child({ props })}
                                        <a href={item.url} {...props}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        {/each}
                    </Sidebar.Menu>
                </Sidebar.GroupContent>
            </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
            <Sidebar.Menu>
                <Sidebar.MenuItem>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            {#snippet child({ props })}
                                <Sidebar.MenuButton
                                    {...props}
                                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    {$session?.user?.displayName ?? "Username"}
                                    <ChevronUp class="ml-auto" />
                                </Sidebar.MenuButton>
                            {/snippet}
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                            side="top"
                            class="w-[--bits-dropdown-menu-anchor-width]"
                        >
                            <DropdownMenu.Item>
                                <span>Account</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <span>Sign out</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Button variant="link" href="/add"
                                    >Add Image</Button
                                >
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Sidebar.MenuItem>
            </Sidebar.Menu>
        </Sidebar.Footer>
    </Sidebar.Root>
    <Sidebar.Inset>
        <header class="flex h-12 items-center justify-between px-4">
            <Sidebar.Trigger />
        </header>
    </Sidebar.Inset>
    <!-- </Sidebar.Provider> -->
</div>
