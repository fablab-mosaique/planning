$dest = "styles/computed/skeleton.css"
Write-Output '@import "tailwindcss";' > "$dest"
foreach ($i in Get-ChildItem "**/*-tailwind.css") {
    (Get-Content "$i" -Raw) -replace "(?m)^\s*@reference `"tailwindcss`";\r?\n?", "" >> "$dest";
}
$generated ="styles/computed/generated.css"
npx @tailwindcss/cli -i "$dest" -o "$generated"
$content = (Get-Content "$generated" -Raw) -replace "(?m)^\s*vertical-align: middle;\r?\n?", ""
Write-Output $content > "$generated"
