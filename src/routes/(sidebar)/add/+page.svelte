<script lang="ts">
    import { db } from "$lib/fireball";
    import { collection, doc, addDoc } from "firebase/firestore";
    import type { Pin } from "$lib/pin";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Title } from "$lib/components/ui/alert";
    import { session } from "$lib/session";
    import { createUploader } from "$lib/uploadthing";
    import { Uploader } from "@uploadthing/svelte";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    // import "@uploadthing/svelte/styles.css";
    // Add a new document with a generated id

    let pin: Partial<Pin> = {};

    // onMount(async () => {
    //     const newPost = doc(collection(db, "add"));

    //     const querySnapshot = await addDoc(newPost);
    //     add = querySnapshot.docs.map((value) => {
    //         return value.data() as Add;
    //     });
    // });
    async function newPost() {
        if (!pin.caption || !pin.img || !pin.title) {
            alert("Add Fields");
            return; // early exit
        }

        const docRef = await addDoc(collection(db, "pins"), {
            username: $session.user?.displayName!,
            likes: 0,
            caption: pin.caption,
            img: pin.img,
            title: pin.title,
        } satisfies Pin);

        // later...
        // await setDoc(Post, data);
        alert("New Post Created");
        goto("/");
    }

    const uploader = createUploader("imageUploader", {
        onClientUploadComplete: (res) => {
            console.log(`onClientUploadComplete`, res[0].ufsUrl);
            pin.img = res[0].ufsUrl;
            alert("Upload Completed");
        },
        onUploadError: (error: Error) => {
            alert(`ERROR! ${error.message}`);
        },
    });
</script>

<div class="flex flex-row w-full justify-center content-center p-20 gap-10">
    <div class=" items-center justify-center">
        <Uploader {uploader} />
    </div>
    <div>
        <Card.Root class="">
            <Card.Header>
                <Card.Title>Create Pin</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="flex w-full max-w flex-col gap-1.5">
                    <Label for="Title">Title</Label>
                    <Input
                        bind:value={pin.title}
                        type="text"
                        id="text"
                        placeholder="Add the Title for your image."
                    />
                </div>
                <div class="flex w-full max-w flex-col gap-1.5">
                    <Label for="caption">Caption</Label>
                    <Input
                        bind:value={pin.caption}
                        type="textarea"
                        id="caption"
                        placeholder="Add caption for your image."
                    />
                </div>
                <div class="flex w-full max-w flex-col gap-1.5">
                    <Label for="url">Image URL</Label>
                    <Input
                        bind:value={pin.img}
                        type="text"
                        id="url"
                        placeholder="Upload image URL."
                    />
                </div>
            </Card.Content>
            <Card.Footer>
                <Button onclick={() => newPost()}>Submit</Button>
            </Card.Footer>
        </Card.Root>
    </div>
</div>
