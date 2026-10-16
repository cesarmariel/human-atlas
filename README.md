# Human Atlas

An interactive 3D anatomy explorer built with React, Three.js, and shadcn/ui. Take the BodyParts3D adult male reference apart into **2,325 individually selectable meshes**, explore **15 anatomical systems**, and search **3,555 named concepts**. A female reference model (Human Reference Atlas, 888 meshes) is available from the anatomy selector.

**[Explore the live demo](https://human-atlas-seven.vercel.app)**

## Explore

- Choose male or female anatomy; the geometry, catalogue, and available systems change together.
- Switch the interface between English and Spanish.
- Orbit, zoom, and select structures directly on the body.
- Toggle individual systems or use skeleton and organ presets.
- Move from assembled anatomy to a spaced inventory of every visible piece.
- Search anatomical names and source identifiers.
- Isolate a selected structure and read what it is and how it works, with a link to the matching OpenStax *Anatomy and Physiology 2e* section (65 organs and structures).
- Use compact controls and detail panels on mobile.

## Run locally

Requires Node.js 22.13 or newer. No API keys or accounts are needed.

```sh
npm ci
npm run dev
```

Open http://localhost:3016. To build the static site, run `npm run build`; the output is in `dist/`.

## Validate

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

Validation covers mesh buffers, names and concept membership, nonoverlapping exploded layouts at desktop and mobile aspect ratios, search and inspection contracts, and tap-versus-drag handling. Browser interaction checks have exercised selection, system controls, search, isolation, rotation, and 390×844, 320×568, and 844×390 layouts. Phone controls stay clear of the exploded inventory, and isolated structures fit the space above or beside the detail panel. Physical-device performance and real multitouch hardware have not been tested.

## Anatomy data

The current viewer uses **BodyParts3D 4.0**, an adult male reference anatomy, licensed **CC BY 4.0**. BodyParts3D 4.0 omits some structures, so 91 meshes (lungs, liver, abdominal wall, facial and masticatory muscles and others) come from **BodyParts3D 3.0** (**CC BY-SA 2.1 Japan**), packaged in their own chunk by `scripts/add-legacy-parts.mjs`. It does not represent every human structure or variation. Individual source meshes are distinct from named concepts, which may group multiple meshes. Descriptions distinguish general system context from individual organ explanations.

Geometry is simplified for browser performance while retaining every source mesh. The packaged model contains 2,288,268 triangles and downloads approximately 33 MB of compressed geometry. Full credits, source links, and adaptation details are in [ATTRIBUTION.md](public/ATTRIBUTION.md).

The female model is the **Human Reference Atlas united-female v1.5** (HuBMAP), licensed **CC BY 4.0**: 888 meshes with the whole-body surface, selected organs, and female reproductive anatomy. Its skeleton and muscle coverage is partial, and eight pregnancy reference pieces are in a separate layer hidden by default. Rebuild it with `scripts/convert-female.py`, then `node scripts/optimize-anatomy.mjs atlas-female.json`.

This is an educational explorer, not a diagnostic or surgical tool.

## How it works

Geometry is merged into batches. Per-structure GPU textures control translation, visibility, and selection, while component geometry supports accurate picking. Exploded layouts pack only the visible pieces. Rendering updates when the scene changes; orbit controls remain responsive without thousands of separate draw calls.

The optional WebMCP tools expose anatomy search and inspection in compatible browsers. The visible interface works without them.

## Rebuilding geometry

The repository includes browser-ready geometry. Rebuilding it is optional: obtain the official BodyParts3D OBJ archive and English metadata tables, prepare the joined concepts and display-system mappings, run `scripts/convert-anatomy.py`, then `node scripts/optimize-anatomy.mjs` and `node scripts/compress-models.mjs`. Simplification uses a 0.2% relative error limit per structure.

## Deploy

Import this repository into Vercel as a Vite project. The included `vercel.json` configures `npm ci`, `npm run build`, and the `dist` output directory. It can also be served by a static host.

## License

Original application code is released under the [MIT License](LICENSE). **The anatomy data and texts have their own licenses**; preserve the attribution when redistributing them:

- BodyParts3D 4.0 meshes and names (`models/body-0.bin` to `models/body-14.bin`): **CC BY 4.0**, © The Database Center for Life Science.
- BodyParts3D 3.0 additions (lungs, liver and 85 other structures in `models/body-15.bin`): **CC BY-SA 2.1 Japan**, © The Database Center for Life Science. Adaptations of that chunk must be shared under the same license.
- Human Reference Atlas female model (`models/atlas-female.json`, `models/female-*.bin`): **CC BY 4.0**, Kristen Browne and Heidi Schlehlein, HuBMAP.
- Organ explanations (`app/organs.ts`) are original texts checked against OpenStax *Anatomy and Physiology 2e* (**CC BY 4.0**).

Full credits and source links are in [ATTRIBUTION.md](public/ATTRIBUTION.md). Third-party dependencies retain their respective licenses.

Issues and pull requests are welcome. Please include reproduction steps and browser/device details for interaction problems.
