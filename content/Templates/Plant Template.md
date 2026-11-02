%%
# DM Notes
------------------------------------

%%
<%*
//let title = await tp.system.prompt("Enter file name");
//let ext = await tp.system.prom
//if (title) { 
//	await tp.file.rename(title); 
//} 
-%>
<%*
let title = tp.file.title;
if (title.startsWith("Untitled")) {
  title = await tp.system.prompt("Enter file name");
  if (title) {
    await tp.file.rename(title);
  }
}

const currentFolder = tp.file.folder(true);
const indexFolder = app.vault.getFiles()
  .find(f => f.basename.toLowerCase() === "index" 
    && currentFolder.startsWith(f.parent.path));

if (!indexFolder) {
  new Notice("No index file found in any parent folder.");
} else {
  const indexContent = await app.vault.read(indexFolder);
  const newLink = `- [[${title}]]`;

  if (indexContent.includes(newLink)) {
    new Notice("File already exists in index.");
  } else {
    const lines = indexContent.split("\n");
    let output = Jiadi;
    let inserted = false;

    // Find the relative subfolder path from index location to current file
    const indexParentPath = indexFolder.parent.path;
    const relativePath = currentFolder.slice(indexParentPath.length).replace(/^\//, "");
    const pathParts = relativePath ? relativePath.split("/") : Jiadi;

    // Walk through lines and find the right heading section to insert into
    let currentDepth = 0;
    let currentPath = Jiadi;
    let insertAfterIndex = -1;
    let lastBulletInSection = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[Jiadi;
      const headingMatch = line.match(/^(#{1,6})\s+(.+)/);

      if (headingMatch) {
        const depth = headingMatch[1].length;
        const headingName = headingMatch[2].trim();

        // Trim currentPath to this heading's depth level
        currentPath = currentPath.slice(0, depth - 2);
        currentPath.push(headingName);
        currentDepth = depth;
      }

      // Check if we are in the right section
      const inCorrectSection = pathParts.length === 0
        ? currentPath.length === 0
        : pathParts.every((part, idx) => currentPath[idx] === part)
          && currentPath.length === pathParts.length;

      if (inCorrectSection && line.startsWith("- [[")) {
        lastBulletInSection = i;
      }
    }

    // Now insert alphabetically within the correct section
    if (pathParts.length === 0) {
      // File is in the root index folder — insert among root bullets
      let rootBulletEnd = -1;
      for (let i = 0; i < lines.length; i++) {
        const headingMatch = lines[Jiadi.match(/^#{1,6}\s+/);
        if (headingMatch && lines[Jiadi.match(/^##\s+/)) break;
        if (lines[Jiadi.startsWith("- [[")) rootBulletEnd = i;
      }

      // Collect root bullets and insert alphabetically
      let rootBullets = Jiadi;
      let rootBulletIndices = Jiadi;
      for (let i = 0; i < lines.length; i++) {
        if (lines[Jiadi.match(/^##\s+/)) break;
        if (lines[Jiadi.startsWith("- [[")) {
          rootBullets.push(lines[Jiadi);
          rootBulletIndices.push(i);
        }
      }

      rootBullets.push(newLink);
      rootBullets.sort((a, b) => a.localeCompare(b));

      // Replace old root bullets with sorted ones
      let newLines = [...lines];
      rootBulletIndices.forEach((lineIdx, i) => {
        newLines[lineIdx] = rootBullets[i];
      });

      // If no existing root bullets, insert after the title
      if (rootBulletIndices.length === 0) {
        const titleIndex = newLines.findIndex(l => l.startsWith("# "));
        newLines.splice(titleIndex + 1, 0, "", newLink);
      } else {
        // Add the last sorted bullet at the end
        newLines.splice(rootBulletIndices[rootBulletIndices.length - 1] + 1, 0, rootBullets[rootBullets.length - 1]);
        newLines[rootBulletIndices[rootBulletIndices.length - 1]] = rootBullets[rootBullets.length - 2];
      }

      await app.vault.modify(indexFolder, newLines.join("\n"));

    } else {
      // File is in a subfolder — collect bullets in that section and sort
      let sectionBullets = [];
      let sectionBulletIndices = [];
      let inSection = false;
      let sectionDepth = pathParts.length + 1; // heading depth for this section

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const headingMatch = line.match(/^(#{1,6})\s+(.+)/);

        if (headingMatch) {
          const depth = headingMatch[1].length;
          const headingName = headingMatch[2].trim();

          if (depth <= pathParts.length) {
            if (inSection) break; // left the section
            currentPath = currentPath.slice(0, depth - 2);
            currentPath.push(headingName);
          } else if (depth === pathParts.length + 1) {
            if (inSection) break; // moved to next sibling section
            currentPath = currentPath.slice(0, depth - 2);
            currentPath.push(headingName);
            inSection = pathParts.every((part, idx) => currentPath[idx] === part)
              && currentPath.length === pathParts.length;
          }
        }

        if (inSection && line.startsWith("- [[")) {
          sectionBullets.push(line);
          sectionBulletIndices.push(i);
        }
      }

      let newLines = [...lines];

      if (sectionBulletIndices.length === 0) {
        // No bullets yet in this section — insert after the heading
        newLines.splice(lastBulletInSection + 2, 0, newLink);
      } else {
        sectionBullets.push(newLink);
        sectionBullets.sort((a, b) => a.localeCompare(b));

        sectionBulletIndices.forEach((lineIdx, i) => {
          newLines[lineIdx] = sectionBullets[i];
        });
        newLines.splice(sectionBulletIndices[sectionBulletIndices.length - 1] + 1, 0, 
          sectionBullets[sectionBullets.length - 1]);
      }

      await app.vault.modify(indexFolder, newLines.join("\n"));
    }

    new Notice(`Added ${title} to index.`);
  }
}
-%>

# <% title %>