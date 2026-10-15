# Anatomy data attribution

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.

- License: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html (updated 2025-02-27)
- Dataset: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- License terms: https://creativecommons.org/licenses/by/4.0/
- Source geometry: `isa_BP3D_4.0_obj_99.zip`, BodyParts3D 4.0.
- English names and relationships: IS-A and PART-OF concept, element, and inclusion tables from the same archive.
- Publication: Mitsuhashi et al. (2009), BodyParts3D: 3D structure database for anatomical concepts. https://doi.org/10.1093/nar/gkn613

Adaptations: axes and units converted from millimeters/Z-up to meters/Y-up; translated to rest at the stage; geometry simplified using meshoptimizer with 0.2% relative error limit per structure; normals quantized to signed 16-bit; packed into binary chunks; curated display system groupings and colors. The 4.0 source contains 2,234 individual OBJ meshes; all remain represented, plus 91 meshes from Release 3.0 (below). The 4.0 hierarchy contains 3,432 named FMA concepts (3,555 with the Release 3.0 additions), which may reference multiple meshes. Original source identity is preserved in the manifest.

Source OBJ comments mention an older CC BY-SA 2.1 Japan license. The official current database license linked above supersedes that legacy text and explicitly permits redistribution and adaptation under CC BY 4.0.

## Additions from BodyParts3D 3.0

BodyParts3D 4.0 omits some structures that Release 3.0 models. These 91 meshes come from BodyParts3D Release 3.0:

BodyParts3D, Copyright© The Database Center for Life Science licensed by CC Attribution-Share Alike 2.1 Japan.

- Meshes: the five lung lobes, the whole liver, the abdominal wall (rectus abdominis, internal oblique, transversus abdominis, pyramidalis), latissimus dorsi, quadratus lumborum, multifidus, spinalis cervicis, the muscles of facial expression and mastication, extensor digitorum brevis and dorsal interossei of the foot, inguinal ligaments, costal cartilages, the twelfth thoracic intervertebral disk, the epicranial aponeurosis, four cerebral structures and two coronary artery segments. The full list, with the source file of each mesh, is in `scripts/legacy-parts.json`.
- Source archive: `BodyParts3D_3.0_obj_99.zip`; concept membership from `composite_parts.txt` of the same release.
- Release: https://dbarchive.biosciencedbc.jp/data/bodyparts3d/20110915/README_e.html
- License terms: https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en
- Packaged separately in `models/body-15.bin` (and `.gz`) by `scripts/add-legacy-parts.mjs`. That chunk and its adaptations are shared under the same CC BY-SA 2.1 Japan license.

Adaptations: same axis, unit and stage conversion as the 4.0 meshes; normals quantized to signed 16-bit; simplified with the same 0.2% relative error limit, except two meshes (upper lobe of right lung, left quadratus lumborum) kept at full detail because simplification collapsed thin edges. Structures that 4.0 already models, even under another name or split differently, were not added. The current database license page (CC BY 4.0, updated 2025-02-27) does not name individual releases, so the license stated in these files is kept.

BodyParts3D represents an adult male reference anatomy based on TARO MRI and anatomical illustration refinements. It is not a complete model of every possible human anatomical structure or variation. This interface is educational and is not a clinical tool.

## Historical assets (not included in the current release)

Earlier repository revisions included female reference anatomy: Kristen Browne and Heidi Schlehlein, Human Reference Atlas / HuBMAP, *3D Reference Organ Set for Female v1.5* (2023). CC BY 4.0. Geometry adapted for this viewer.

- Source DOI: https://doi.org/10.48539/HBM352.BTSQ.586
- Dataset: https://lod.humanatlas.io/ref-organ/united-female/v1.5
- Original GLB: https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.5/assets/3d-vh-f-united.glb
- License: https://creativecommons.org/licenses/by/4.0/

Adaptations: translated native meter/Y-up coordinates onto the stage, coincident vertices welded and source normals averaged, geometry simplified with a 0.2% per-structure relative error bound, and normals quantized. Colors and display systems are curated for this interface. All 888 source meshes are represented, with 1,073 source nodes available as selectable individual or compound concepts.

This is a reference assembly with whole-body surface and selected organs, including female reproductive anatomy. Its skeleton and muscle coverage is partial. It is not a complete model of every human structure or a single-person scan. Eight placenta/umbilical structures are classified under Pregnancy reference and hidden by default.
