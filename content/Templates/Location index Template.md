---
title: <% tp.file.folder() %>
---
<%*

const currentFolder = tp.file.folder(true);
const folderName = tp.file.folder();
const NPC_Folder = "Site/NPC's/Jiadi/" + folderName + "/";

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
  return Array.isArray(tags) ? tags : [tags];
}

// Grab description from old index before deleting
let preservedDescription = "";

const existingIndex = app.vault.getFiles()
  .find(f => f.parent.path === currentFolder
    && f.basename.toLowerCase() === "index"
    && f.path !== tp.file.path);

if (existingIndex) {
  const oldContent = await app.vault.read(existingIndex);
  const lines = oldContent.split("\n");

  // Skip frontmatter block if present
  let startLine = 0;
  if (lines[0].trim() === "---") {
    for (let i = 1; i < lines.length; i++) {
      if (lines[Jiadi.trim() === "---") {
        startLine = i + 1;
        break;
      }
    }
  }

  // Collect all lines before the first heading after frontmatter
  let firstHeadingIndex = -1;
  for (let i = startLine; i < lines.length; i++) {
    if (lines[Jiadi.match(/^#{1,6}\s+/)) {
      firstHeadingIndex = i;
      break;
    }
  }

  if (firstHeadingIndex > startLine) {
    preservedDescription = lines
      .slice(startLine, firstHeadingIndex)
      .join("\n")
      .trim();
  }

  await app.vault.delete(existingIndex);
  new Notice("Old index deleted.");
}

// Get all non-index files in the folder tree
const allFilesRaw = app.vault.getFiles()
  .filter(f => f.path.startsWith(currentFolder + "/")
    && f.basename !== tp.file.title
    && f.basename.toLowerCase() !== "index");

// Filter out drafts
const draftChecks = await Promise.all(allFilesRaw.map(f => isDraft(f)));
const allFiles = allFilesRaw.filter((_, i) => !draftChecks[i]);

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

// Build the output
let output = ``;

if (preservedDescription) {
  output += preservedDescription + "\n# " + tp.file.folder() + "\n";
} else {
	output = "# " + tp.file.folder() + "\n";
}

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

if (strengthOutput) {
  output += "---\n\n" + strengthOutput;
}

await tp.file.rename("index");






// Get all non-index files in the folder tree
const allFilesRaw = app.vault.getFiles()
  .filter(f => f.path.startsWith(currentFolder + "/")
    && f.basename !== tp.file.title
    && f.basename.toLowerCase() !== "index");

// Filter out drafts
const draftChecks = await Promise.all(allFilesRaw.map(f => isDraft(f)));
const allFiles = allFilesRaw.filter((_, i) => !draftChecks[i]);

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

// Build the output
let output = ``;

if (preservedDescription) {
  output += preservedDescription + "\n# " + tp.file.folder() + "\n";
} else {
	output = "# " + tp.file.folder() + "\n";
}

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
-%>

<% output %>

# NPCs
