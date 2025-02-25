<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { onMount } from "svelte";
    import { collection, query, where, getDocs } from "firebase/firestore";
    import { db } from "$lib/fireball";
    import type { Pin } from "$lib/pin";
    import Masonry from "$lib/components/masonry/masonry.svelte";
    

    let pins: Pin[] | null;

    onMount(async () => {
        const q = collection(db, "pins");

        const querySnapshot = await getDocs(q);
        pins = querySnapshot.docs.map((value) => {
            return value.data() as Pin;
        });
        console.log(pins)
    });
</script>
<!-- <div class="grid grid-cols-2 md:grid-cols-4 gap-4 m-1"> -->
<!-- <div class="grid grid-cols-2 md:grid-cols-3 gap-4 absolute "> -->


{#if pins}
<div class="m-5 p-8 columns-5">
<Masonry items={pins} gridGap={'1rem'} stretchFirst={false} reset>
    {#each pins as pin}
    
        <Card.Root >
            <Card.Header>
                <Card.Title>{pin.username}</Card.Title>
                <Card.Description>{pin.likes}</Card.Description>
            </Card.Header>
            <Card.Content>
                <img src={pin.img} alt="pin" />
            </Card.Content>
            <Card.Footer>
                <p>{pin.caption}</p>
            </Card.Footer>
        </Card.Root>
        
    {/each}
    </Masonry>
</div>
{/if}

