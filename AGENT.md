# Build notes

**Entry:** "Forwarded to Uncle Jim", a one-line Thanksgiving out-of-office reply (153 characters, 157 bytes). The wording is fixed and was not changed during the build.

**Program:** `main.ts` (Node, no dependencies) holds the entry and the limits as named constants, writes the line to `/output/entry.txt`, and reads it back.

**Gate:** the text must be 1 to 160 characters, a single line with no newline, not only whitespace, with no edge whitespace or control characters. The program throws before writing if any check fails.

**Verification:** after writing, the file is read back and compared byte for byte with the entry. Expected output: 153 characters, 157 bytes, sha256 `de4a351566d8cb1de550c152406848b6c3bbcde7134742c3421e85bbe4a206c4`. Run with `node main.ts`.
