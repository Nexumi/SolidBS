import { Button } from "./ui/button";

export default function LoadButtons() {
  const buttonClass =
    "border bg-white text-black hover:bg-gray-200 h-auto px-2 py-1";

  return (
    <>
      <div class="flex gap-x-1">
        <input id="file" class="hidden" type="file" accept="image/*" />
        <Button class={buttonClass} id="custom_file">
          Upload Receipt
        </Button>
        <Button class={buttonClass} id="load_url">
          Load From URL
        </Button>
      </div>
    </>
  );
}
