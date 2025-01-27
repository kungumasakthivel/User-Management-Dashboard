# User Management Dashboard

### Setup Instruction

* Clone the repo using `git clone https://github.com/kungumasakthivel/User-Management-Dashboard.git`
* Change the direactory, to cloned folder
* Then install `node_modules` folder using `npm install`
* Run the application using `npm run dev`

This repo has two branch `main` and `v2`

* The difference is the  `main` branch makes delete user with help of calling delete API, due to some internal constrain update in server won't reflect in UI
* But in `v2` branch, users details can be deleted temporarily via **filter** method and re-rendering the UI to see the changes.
  * Changes are not reflected in server, but it reflects in UI temporarily.

Hosted Link

* `v2` branch [https://sakthivel-umd-v2.netlify.app/](https://sakthivel-umd-v2.netlify.app/)
* `main` branch [https://sakthivel-umd.netlify.app/](https://sakthivel-umd.netlify.app/)
