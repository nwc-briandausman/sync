#=============================================#
# Setting up yeoman (mac - osx mavericks)
#=============================================#
1.) Install nodejs
Download node
http://nodejs.org/

run the package installer

run through the simple wizard
nothing too difficult

test in terminal after install
type:
npm --version
(output): 1.4.21 




2.) Install Yeoman
Open a terminal window (anywhere it doesn't matter at this point)
type: npm install -g yo
or
type: sudo npm install -g yo
type: {{your password}}

took approx 1 min with 16b ram, ssd, i7 mbp
note: from here on out you might need 'sudo' before anything you try to install via terminal, but i won't include it anymore

3.) Make sure bower & grunt were installed
type: bower --version
type: grunt --version

note: also make sure you have ruby installed and compass installed

(output): 1.3.8, grunt-cli v0.1.13

If you don't have grunt and bower installed please do that now
type: npm install -g bower
type: npm install -g grunt-cli

3.) Install a Yeoman Generator
I prefer the angularJs generator, but you can choose the basic webapp or any other generator (you can install multiple generators to use on later projects - http://yeoman.io/generators/official.html)
type: npm install -g generator-angular

took aprox 1.5 min

4.) Create a new project
navigate to the directory of your choosing (where you want to host your project)
our example will be /Application/playground/

create a new project folder
type: mkdir yoTest

enter the new folder
type: cd yoTest

confirm your in that folder with
type: pwd
(output): /Application/playground/yoTest

5.) Run the new generator
type: yo angular

note: if this is your first time yo will ask you if you'd like to improve yeoman...type y or n. I'd say y but to each their own.

6.) Choose the extras you'd like to install
note: different generators come with options you can choose to include. for example the angular generator asks if you want to include sass w/compass, twitter bootstrap, the sass version of bootstrap, and a handful of andular modules.

For each step say y or n if youwant to include it.
For the final step, the angular modules step, use your spacebar to select which you'd like to include.

We can uncheck all of them for the purposes of this demo.

Hit enter

It'll do it's thing
took approx 2 min (why am i telling you this? because the first few times I did this [on a wondows machine] it took over 15 min, well it was apparently locking up everytime but i had no idea it should only take a few min per step)

7.) Checkout your yoTest folder
you should have a bunch of files, importantly an app folder. This is your working directory.

8.) Fire up a grunt server
type: grunt serve

took approx .5 min

9.) Edit the html
Make a change to /app/index.html
watch the browser, it should live reload!

Very good, we're pretty much done. But this is not web ready. It's got a lot of linked files, not minified, just all around not too production ready.

We can take care of that....

10.) Build the project
in terminal hit ctl+c to stop the grunt server.
type: y (if prompted)

type: grunt serve:dist

this is building, minifying and all around prod readying our project.
took around .5 min

Now checkout your project's root, you'll see a new folder 'dist'
These are the prod ready files.
Checkout out some of the source....all minified. Awesome.

You can throw that bad boy up on your server now.

</end>
