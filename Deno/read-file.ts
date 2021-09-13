import { copy } from "https://deno.land/std@0.106.0/io/util.ts";
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename)
  await copy(file, Deno.stdout);
  file.close();
}
