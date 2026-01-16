$urls = @(
    "https://wiki.fishingplanet.com/Lone_Star_Lake_-_Texas",
    "https://wiki.fishingplanet.com/Lesni_Vila_Fishery_-_Czech_Republic",
    "https://wiki.fishingplanet.com/Mudwater_River_-_Missouri",
    "https://wiki.fishingplanet.com/Rocky_Lake_-_Colorado",
    "https://wiki.fishingplanet.com/Emerald_Lake_-_New_York",
    "https://wiki.fishingplanet.com/Neherrin_River_-_North_Carolina",
    "https://wiki.fishingplanet.com/Ghent-Terneuzen_Canal_-_Netherlands",
    "https://wiki.fishingplanet.com/Falcon_Lake_-_Oregon",
    "https://wiki.fishingplanet.com/Everglades_-_Florida",
    "https://wiki.fishingplanet.com/Tiber_River_-_Italy",
    "https://wiki.fishingplanet.com/White_Moose_Lake_-_Alberta",
    "https://wiki.fishingplanet.com/Quanchkin_Lake_-_Louisiana",
    "https://wiki.fishingplanet.com/Saint-Croix_Lake_-_Michigan",
    "https://wiki.fishingplanet.com/San_Joaquin_Delta_-_California",
    "https://wiki.fishingplanet.com/Kaniq_Creek_-_Alaska",
    "https://wiki.fishingplanet.com/Sander_Baggersee_Lake_-_Germany",
    "https://wiki.fishingplanet.com/Dnipro_River_-_Ukraine",
    "https://wiki.fishingplanet.com/Selenge_River_-_Mongolia",
    "https://wiki.fishingplanet.com/Weeping_Willow_Fishery_-_United_Kingdom",
    "https://wiki.fishingplanet.com/Blue_Crab_Island_-_Mississippi",
    "https://wiki.fishingplanet.com/Maku-Maku_Lake_-_Peru",
    "https://wiki.fishingplanet.com/Marron_River_-_Bolivia",
    "https://wiki.fishingplanet.com/Amazonian_Maze_-_Brazil",
    "https://wiki.fishingplanet.com/Congo_River_-_Congo",
    "https://wiki.fishingplanet.com/Kaiji_No_Ri_-_Japan",
    "https://wiki.fishingplanet.com/Noomaa_Kuda_Atholhu_-_Maldives",
    "https://wiki.fishingplanet.com/Akhtuba_River_-_Russia"
)

$outFile = "c:\Users\Admin\Downloads\aposentados-da-pesca\maps_output.txt"
"Results:" | Out-File $outFile -Encoding utf8

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UserAgent "Mozilla/5.0" -ErrorAction Stop
        $images = $response.Images | Where-Object { $_.src -match "Map" -or $_.src -match "map" }
        
        if ($images) {
            foreach ($img in $images) {
                $src = $img.src
                if ($src -notmatch "^http") {
                    $src = "https://wiki.fishingplanet.com" + $src
                }
                "$url -> $src" | Out-File $outFile -Append -Encoding utf8
            }
        }
        else {
            "NOT FOUND: $url" | Out-File $outFile -Append -Encoding utf8
        }
    }
    catch {
        "ERROR: $url - $_" | Out-File $outFile -Append -Encoding utf8
    }
}
