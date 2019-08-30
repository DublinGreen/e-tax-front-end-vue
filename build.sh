echo "Intializing build process ...git "
echo "backing up dist folder."
rm -rf .dist
mv dist .dist 
echo "dist folder backuped"
echo "Generating dist"
npm run generate
echo "Dist generated"
echo "adding git to dist"
cp -r .dist/.git dist    
echo "Git added to dist"
echo "Build Successfull"
echo "Changing directory"
cd ./dist
echo "Perform git actions"
git add --all
git commit -m "Dist repository update"
echo "Commit Successfull. Kindly push to remote repository"