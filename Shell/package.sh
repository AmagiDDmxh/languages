sub=$1-sub_$(date +"%Y-%m-%dT%H:%M:%S%Z")

cp -r $1 $sub 
zip -r "$sub.zip" $sub/*
rm -rf $sub/node_modules
rm -rf $sub/.git
rm -rf $sub 
unzip -l "$sub.zip"
