rm .\3rdpartylicenses.txt
rm .\favicon.ico
rm .\*.html
rm .\*.js
rm .\*.css
rm .\*.map

cd .\xer
ng build

cd ..
cp .\xer\dist\xer\* .\