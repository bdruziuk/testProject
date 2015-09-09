Steps to setup baseproject-ui template for any angular development

1) Install node and make sure the executables are added to the path

2) Install ruby and make sure the executables are added to the path

3) Install bundle using "gem install bundle"

4) Install git and make sure the executables are added to the path

5) Install grunt-cli as a global package using "npm install grunt-cli -g"

6) Install bower as a global package using "npm install bower -g"

7) Install karma-cli as a global package using "npm install karma-cli -g"

8) git clone the baseproject-ui using "git clone git@bitbucket.org:windmillgmbh/baseproject-ui.git"

9) Rename the baseproject-ui folder to the folder name of your preference

10) Using command prompt change to the renamed folder.

11) Install the node modules using "npm install"

12) Install the gem modules using "bundle install"

13) Install the bower modules using "bower install"

14) Install selenium and chrome web browser for e2e tests using ">node .\node_modules\protractor\bin\webdriver-manager update"


15) For development execute "grunt serve" and access "http://localhost:9000/#/sample

16) For unit testing execute "grunt unit"

17) For e2e testing execute "grunt serve" in one command window and after it starts the server execute "grunt e2e" in other command window