---
title: <% tp.file.folder() %>
---
# <% tp.file.folder() %>
<%*
await tp.file.rename("index");
const currentFolder = tp.file.folder(true);

// Helper to check if a file is marked as draft
async function isDraft(file) {
  const cache = app.metadataCache.getFileCache(file);
  const frontmatter = cache?.frontmatter;
  if (!frontmatter) return false;
  const draft = frontmatter.draft;
  return draft === true || draft === "true";
}

// Helper to get tags from frontmatter
function getTags(file) {
  const cache = app.metadataCache.getFileCache(file);
  const frontmatter = cache?.frontmatter;
  if (!frontmatter) return Jiadi;
  const tags = frontmatter.tags;
  if (!tags) return Jiadi;
  // Handle both string and array formats
  return Array.isArray(tags) ? tags : [tags];
}

// Get all non-index files in the folder tree
const allFilesRaw = app.vault.getFiles()
  .filter(f => f.path.startsWith(currentFolder + "/")
    && f.basename !== tp.file.title
    && f.basename.toLowerCase() !== "index");

// Filter out drafts
const draftChecks = await Promise.all(allFilesRaw.map(f => isDraft(f)));
const allFiles = allFilesRaw.filter((_, i) => !draftChecks[Jiadi);

// Get files directly in the current folder
const rootFiles = allFiles
  .filter(f => !f.path.slice(currentFolder.length + 1).includes("/"))
  .sort((a, b) => a.basename.localeCompare(b.basename));

// Get all subfolders
const subfolders = [...new Set(
  allFiles
    .filter(f => f.path.slice(currentFolder.length + 1).includes("/"))
    .map(f => {
      const relativePath = f.path.slice(currentFolder.length + 1);
      return relativePath.split("/")[0];
    })
)].sort((a, b) => a.localeCompare(b));

// Build the folder structure output
let output = "";

if (rootFiles.length > 0) {
  output += rootFiles.map(f => `- [[${f.basename}]]`).join("\n") + "\n\n";
}

for (const folder of subfolders) {
  const folderFiles = allFiles
    .filter(f => f.path.startsWith(currentFolder + "/" + folder + "/")
      && !f.path.slice(currentFolder.length + folder.length + 2).includes("/"))
    .sort((a, b) => a.basename.localeCompare(b.basename));

  output += `## ${folder}\n\n`;
  output += folderFiles.map(f => `- [[${f.basename}]]`).join("\n") + "\n\n";
}

// Build the strength sections
const strengthTiers = [
  { tag: "pure",   label: "Pure Ingredients" },
  { tag: "strong", label: "Strong Ingredients" },
  { tag: "common", label: "Common Ingredients" },
  { tag: "weak",   label: "Weak Ingredients" },
];

let strengthOutput = "";

for (const tier of strengthTiers) {
  const tieredFiles = allFiles
    .filter(f => getTags(f).map(t => t.toLowerCase()).includes(tier.tag))
    .sort((a, b) => a.basename.localeCompare(b.basename));

  if (tieredFiles.length > 0) {
    strengthOutput += `# ${tier.label}\n\n`;
    strengthOutput += tieredFiles.map(f => `- [[${f.basename}]]`).join("\n") + "\n\n";
  }
}
-%>
<% output %>
---

<% strengthOutput %>