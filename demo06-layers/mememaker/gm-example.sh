# gm identify -verbose ./app/resources/homer-sample.jpg

gm convert \
    ./app/resources/homer-sample.jpg \
    -font ./app/resources/impact.ttf \
    -pointsize 50 \
    -fill "#FFF" \
    -stroke "#000" \
    -strokeWidth 1 \
    -draw "gravity center text 0,-155 \"Quando\"" \
    -draw "gravity center text 0,155 \"te chamam pra festa\"" \
    output.png

echo "Completed process!"