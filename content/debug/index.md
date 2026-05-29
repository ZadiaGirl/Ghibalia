---
title: debug
---

<%*
const currentFolder = tp.file.folder(true);
const files = app.vault.getFiles()
  .filter(f => f.path.startsWith(currentFolder + "/") 
    && !f.path.includes("/", currentFolder.length + 1)
    && f.basename !== tp.file.title)
  .sort((a, b) => a.basename.localeCompare(b.basename));

const list = files.map(f => `- [[${f.basename}]]`).join("\n");
-%>

# <% tp.file.title %>

<% list %>