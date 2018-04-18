
I-Getting Started:
1.Course Introduction:
2.The course & Angular4.
3.What is Ionic2?
  Apache Cordova: compiles JS+HTML+CSS to native mobile Apps
  Angular2=>Ionic2=>(HTML+CSS+JS)=>Apache Cordova=>(iOS,Android,Windows phone)

4.Just be safe: What is Angular 2?
Componenents,Databinding,Dependency Injection,Services,Http,Directives,Forms

5.Course requirements:
Angular 2
HTML&CSS

6.Creating your First App:
	1)Install Node
	2)install Ionic and Cordova:
		> sudo npm install ionic cordova -g
	3)Start new Project:
		> ionic start firstapp --type=ionic-angular
		> tabs
		
7.Creating our First Ionic2 Project and App:

8.Changing our First App:

9.Running your App on a Real Devise:
// Deprecated to see later
10.The Structure of this Course:

11.How to get the Most out of this Course:

12.Section Source Code & Links:
run local ionic version:
	> npm run ionic:serve
II-Mastering the Basics:
1.Module Introduction:
	Project Structre, Naviguation, Pages Vs Component, Ionic 2 Components, Styling & Theming, 
2.A different Way of Creating a New Project:
	>ionic start firstapp --type=ionic-angular
	>blank
3.Other available Project Templates:
	>sidebar|tutorial|super
4.Understanding the Structure of an Ionic2 Project:
	#hooks/README.ms: 
		you might need if you were an advansed dev
		you can re-configure/create automatic scripts trigged by Cordova after the App run|served|...
	#plateforms:
		add plateform to generate its code:
		We don't have to add platforms right now, we can develop our App and test it in the browser without any plateform added.
	#plugins:
		Stores all the Cordova plugins we can use.
		We manage plugins with CLI automatically. We don't touch this folder
	#ressources:
		have a look with deployement section
		define App icone and splash screen
	#www:
		lanched by ionic serve for Web App test version.
	#config.xml:
		deployment section
		configure your App (name of the App,etc)
	#src:
		#declarations.d.ts:
			Advansed used.
			Declare your own variables.
		#index.html
			the principal file which taken by Cordova and will be packed into a native code.
		#manifest.json & service-worker.js:
			for web App

5.How an Ionic 2 App Works:
	#index.html:
		<ion-app></ion-app> //selector
		...//this selector is picked up by some code in this file which bootstrap our Angular App
		<script src="build/main.js"></script>
	#app.module.ts:
		ionic wraps itself around your app component
		import IonicModule.forRoot(MyApp): imports automatically FormsModule and the HttpModule
		entryComponent: hey Angular be prepared to give me instances of those components which are already in the declaration Array. 
			=> replace the selector 

6.Pages Vs Components:
	A page is a component but not every component is a page.

7.How Naviguation works in Ionic2:
	Ionic Does not use the Angular Router, it has its own naviguation concept which is a stack of pages.
	stack of pages, push,pop and delete pages during naviguation.

8.Initializing naviguation in the AppComponent:
	#app.html
		<ion-nav [root]="rootPage"></ion-nav>:
			initialize the stack of pages and ionic nav controller
	#app.component.ts:
		rootPage = HomePage ;
9.Creating a Page and how to navigate to it:
	> ionic generate page profile => bug
	
	Duplicating existing page folder:
	src/pages/profile/
	
	modified:   src/app/app.module.ts:
		//add to declaration and entryComponent Array : ProfilePage
	modified:   src/pages/home/home.html*
		+  <button ion-button (click)="goToUsers()">Users</button>
	modified:   src/pages/home/home.ts
		+  goToUsers(){
		+    this.navCtrl.push(ProfilePage);
		+  }
10.First Summary:
11.An Alternative Way of creating Page:
	Create page under existing page:
	//Duplicate a hole directory page and adapting it with new name
	#creation of user under users:
		src/pages/users/user/user.html
		src/pages/users/user/user.scss
		src/pages/users/user/user.ts
	#src/app/app.module.ts: registring User in declarations and entryComponents
	#src/pages/users/users.html: adding button going to User Page:
		+<button ion-button (click)="onGoToUser()">User</button>
	#src/pages/users/users.ts:
		+import { UserPage } from './user/user';
		//adding the function declanched on the event
		+  onGoToUser(){
		+    this.navCtrl.push(UserPage);
		+  }
12.Passing Data between Pages:
	We can pass string,object,array
	
	modified:   src/pages/users/users.html:
		<button ion-button (click)="onGoToUser('Karim')">User 'Karim'</button>
		<hr>
		<button ion-button (click)="onGoToUser('Duodecimo')">User 'Duodecimo'</button>
		
	modified:   src/pages/users/users.ts:
	//  onGoToUser(){
	//    this.navCtrl.push(UserPage);
	+  onGoToUser(name:string){
	+    this.navCtrl.push(UserPage,{name:name});
	   }
		
	modified:   src/pages/users/user/user.ts
		-export class UserPage {
		+export class UserPage implements OnInit{
		//---
		-  constructor(public navCtrl: NavController) {
		+  constructor(public navCtrl: NavController,private navParams: NavParams)
		//---
		+  ngOnInit(){
		+    this.name = this.navParams.get('name'); #getting Object property
		+    //this.name = this.navParams.data;  #passing the hole Object
		+  }
13.Popping Pages: Going Back:
	Creating a manually back previous page and manually back Root Page:
	src/pages/users/user/user.html:
		+<button ion-button (click)="onGoBack()">Confirm</button>
	src/pages/users/user/user.ts:
		+  onGoBack(){
		+    //this.navCtrl.pop(); //go to previous page
		+    this.navCtrl.popToRoot(); //go to Root Page and empty the stack
		+  }
14.Time to Parctise : Pages & Naviguation : Problem :
	4 exercices:
15.Saving Time with helpful Naviguation Directives:
	#naviguation to a specifig page:
	modified:   src/pages/home/home.html
		// <button ion-button (click)="onGoToUsers()">Users</button>
		+  <button ion-button [navPush]="usersPage">Users</button>
	modified:   src/pages/home/home.ts
		-  onGoToUsers(){
		-    this.navCtrl.push(UsersPage);
		-  }
		+  usersPage = UsersPage;

	#back button naviguation:
	modified:   src/pages/users/users.html
		+  <button ion-button navPop>Back</button>

16.Configuring Page Transitions:
	this.navCtrl.push(NewPage, {}, {
		direction: 'back', // default for push is 'forward'
		duration: 2000, // 2 seconds
		easing: 'ease-out'
	});	
	//Docs:		
		animate (boolean): Whether or not the transition should animate.
		animation (string): What kind of animation should be used.
		direction (string): The conceptual direction the user is navigating. For example, is the user navigating forward, or back?
		duration (number): The length in milliseconds the animation should take.
		easing (string): The easing for the animation.

17.Understanding the LifeCycle of a Page:
	ionViewCanEnter : Nav Guard : Should the page be loaded ?
	ionViewCanLeave: Nav Guard : May I leave this page ?
	ionViewDidLoad : Is the page is loaded = is present in our stack of pages ?
	ionViewWillEnter : When Page become active
	ionViewDidEnter: Page fully entred + active Page : also fired when cached
	ionViewWillLeave : Page is about to leave and become inactive
	ionViewDidLeave: Page finished leaving and become inactive
	
	#good_article: https://blog.ionicframework.com/navigating-lifecycle-events/
18.The Page Lifecycle in Action:
	these method are defined without importing any thing
	There is difference between Angular routing and Ionic Routing:
	
Order of LifeCycle hooks :
	CanEnter/DidLoad(once until removing page)/WillEnter/DidEnter
	CanLeave/WillLeave/DidLeave
	
	DidLoad when loaded page
	!= WillUnload when page removed from the stack

	#modified:   src/pages/users/users.ts:
	  //Enter Hooks ordred
	  ionViewCanEnter(): boolean | Promise<boolean> {
		console.log('ionViewCanEnter');
		let rnd = Math.random();
		return rnd > 0.5;
	  }
	  //executed if is loaded new in the stack
	  ionViewDidLoad(){
		console.log('ionViewDidLoad');
	  }
	  ionViewWillEnter(){
		console.log('ionViewWillEnter');
	  }
	  ionViewDidEnter(){
		console.log('ionViewDidEnter');
	  }
	  //Leave Hooks ordred
	  ionViewCanLeave(): boolean | Promise<{}> {
		console.log('ionViewCanLeave');
		let promise = new Promise( (resolve,reject)=>{
		  setTimeout(()=>resolve(),1000);
		});
		return promise;
	  }
	  ionViewWillLeave(){
		console.log('ionViewWillLeave');
	  }
	  ionViewDidLeave(){
		console.log('ionViewDidLeave');
	  }
	  //executed when it leaves the stack
	  ionViewWillUnload(){
		console.log('ionViewWillUnload');
	  } 
	#modified:   src/pages/home/home.html:
		-  <button ion-button [navPush]="usersPage">Users</button>
		+  <!-- <button ion-button [navPush]="usersPage">Users</button> -->
		+  <button ion-button (click)="onGoToUsers()">Users</button>	
	#modified:   src/pages/home/home.ts:
	+  onGoToUsers(){
	+    this.navCtrl.push(UsersPage)
	+    .catch( err=> console.log('Access denied, Error:' + err) );
	+  }

19.How To Use the Ionic Documentation:
20.Styling the App and Setting a Theme:
	every page = page.scss
	global theme : theme/variables.scss
	Documentation : Theming
21.Using utility attributes:
	Documentation : utilities attributes:
		padding,margin,text-center,...
22.Module Summary:

III-"Favorite Quotes" App (Navigation,Pages and Components):
1.Module Introduction:
2.What we are going to build:
	Overview of the App
3.Breaking the App into Pieces (Defining the App Structure)
	Setting all the Interfaces in one schema.
4.Creating the required Pages:
	ionic start favoriteQuotes blank
	ionic g page library
	ionic g page quotes
	ionic g page quote
	ionic g page favorites
	ionic g page settings
	#src/app/app.component.ts:
		//setting our rootPage to favoritesPage and deleting home
5.Multiple Stacks of Pages vs One Single Stack:
	Using Tabs|SideMenu : every tab has his own stack
6.Implementing Tabs Naviguation with Multiple Stacks of Pages:
	src/pages/tabs/tabs.html
	src/pages/tabs/tabs.ts
	modified:   src/app/app.component.ts
		declaring TabsPages
	modified:   src/app/app.module.ts
		rootPage:any = TabsPage;
	
7.Adding Quotes Data:
	src/data/quotes.ts
8.Using the Quotes Data:
	1)Adding Quote interface:
	#src/data/quote.interface.ts:
		export interface Quote {
			id: string,
			person: string,
			text: string,
		}
	#src/pages/library/library.ts:
		import { Component, OnInit } from '@angular/core';
		import { NavController, NavParams, Icon } from 'ionic-angular';
		import { Quote } from '../../data/quote.interface';
		import quotes from '../../data/quotes';

		@Component({
		  selector: 'page-library',
		  templateUrl: 'library.html',
		})
		export class LibraryPage implements OnInit {

		  quotesCollection:{
			categorie: string,
			quotes: Quote[],
			Icon: string
		  }[];

		  constructor(public navCtrl: NavController, public navParams: NavParams) {
		  }

		  ngOnInit(){
			this.quotesCollection = quotes;
		  }
		}
9.Using the Ionic "List" and "List Item" Components:
#modified:   src/pages/library/library.html:
<ion-list>
	<button ion-item *ngFor="let quoteGroup of quotesCollection">
		Quote
	</button>  
</ion-list>
10.How to create more complex List Items:
#modified:   src/pages/library/library.html:
<ion-list>
	<button ion-item *ngFor="let quoteGroup of quotesCollection">
	  <ion-icon [name]="quoteGroup.icon" item-left></ion-icon>
	  <h2>{{ quoteGroup.category | uppercase }}</h2>
	  <p>{{quoteGroup.quotes.length}} Quotes</p>
	</button>  
</ion-list>

11.Passing the Quotes Data Between Pages:
the template is loaded before ionViewDidLoad
	#modified:   src/pages/library/library.html:
-    <button ion-item *ngFor="let quoteGroup of quotesCollection">
+    <button ion-item *ngFor="let quoteGroup of quotesCollection" [navPush]="quotesPage" [navParams]="quoteGroup">
	#modified:   src/pages/library/library.ts:
	+  quotesPage=QuotesPage;
	#modified:   src/pages/quotes/quotes.html:
+    <ion-title>{{quotesGroup.category | uppercase}}</ion-title>	
	#modified:   src/pages/quotes/quotes.ts
+  quotesGroup: { category: string, quotes: Quote[], icon: string };
//...
+  ngOnInit(){
+    this.quotesGroup = this.navParams.data;
+  }
+
+  // // add ? operator in the variable of the template to use this approach
+  // ionViewDidLoad(){
+  //   this.quotesGroup = this.navParams.data;
+  // }
 
12.Using the Ionic Cards Component:
#modified:   src/pages/quotes/quotes.html:
<ion-content padding text-center>
  <ion-card *ngFor="let quote of quotesGroup.quotes; let i = index">
	<ion-card-header>
	  #{{i}}
	</ion-card-header>
	<ion-card-content>
	  {{quote.text}}
	</ion-card-content>
  </ion-card>
</ion-content>

13.Using the Ionic Grid,Buttons and Styling Cards:
#modified:   src/pages/quotes/quotes.html:
<ion-content padding text-center>
  <ion-card *ngFor="let quote of quotesGroup.quotes; let i = index">
    <ion-card-header >
      #{{i}}
    </ion-card-header>
    <ion-card-content >
      {{quote.text}}
    </ion-card-content>
    <ion-row text-right>
      <ion-col>
        <button ion-button clear small>Favorites</button>
      </ion-col>
    </ion-row>
  </ion-card>
</ion-content>
14.Adding Custom Styles:
#modified:   src/pages/quotes/quotes.scss:
.author{
    color:#ccc;
    text-align: right;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
    
    &:before{
        content: '- ';
    }
}
#modified:   src/pages/quotes/quotes.html:
<p>{{quote.text}}</p>
<p class="author">{{quote.person}}</p>

15.Adding Alerts to the App:
#modified:   src/pages/quotes/quotes.html:
	<button ion-button clear small ++(click)="onAddToFavorites()"++>Favorites</button>
#modified:   src/pages/quotes/quotes.ts:
  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
+               private alertCtrl: AlertController) {
   }
//---
onAddToFavorites(){
  let alert = this.alertCtrl.create({

  title: 'Add to favorites',
  message: 'Do you want to add this quote to favorites?',
  buttons: [
	{
	  text: 'Cancel',
	  role: 'cancel',
	  handler: () => {
		console.log('Canceled');
	  }
	},
	{
	  text: 'Add to favorites',
	  handler: () => {
		console.log('Added to favorites');
	  }
	}
  ]
});
alert.present();
}

16.Working with Angular 2 services in the Ionic 2 App:
Creating a service :
#src/services/quotes.ts:
import {Quote} from '../data/quote.interface';

export class QuotesService {
    private favoriteQuotes:Quote[] = [];

    addQuoteToFavorites(quote: Quote){
        this.favoriteQuotes.push(quote);
    }

    removeQuoteFromFavorites(quote:Quote){
        let pos = this.favoriteQuotes.findIndex(q=>{
            return q.id == quote.id;
        });
        this.favoriteQuotes.splice(pos,1); //from pos just 1 element
    }

    getFavoritesQuotes(){
        return this.favoriteQuotes.slice(); //slice to avoid that javascript passes the object by reference, so it passes a copy in our case.
    }
}

17.Marking Quotes as Favorites by using a Service:
#modified:   src/app/app.module.ts:
1)Registering the QuotesService in providers Array.
#modified:   src/pages/quotes/quotes.html: //adding param to the quote function
+  <button ion-button clear small (click)="onAddToFavorites(++quote++)">Favorites</button>
#modified:   src/pages/quotes/quotes.ts:
2) Injecting the QuotesService in the constructor:
+	private quotesService: QuotesService) {
//---
//Add arg to the function onAddToFavorites:
+  onAddToFavorites(selectedQuote: Quote){
//---
3) modify the handler of the alert when confirm:
+   this.quotesService.addQuoteToFavorites(selectedQuote);

18.Preparing the Favorite Quotes Page:
#modified:   src/pages/favorites/favorites.ts:
import { Component } from '@angular/core';
import { Quote } from '../../data/quote.interface';
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];
  constructor(private quotesService) {
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoritesQuotes();
  }
}

19.Diving Deeper into List Items:
#modified:   src/pages/favorites/favorites.html:
<ion-content padding>
  <ion-list>
    <ion-item *ngFor="let quote of quotes">
      <h2>{{quote.person}}</h2>
      <p>{{quote.text}}</p>
    </ion-item>
  </ion-list>
</ion-content>

##N9
// fix height text output
<p style="height:50px">  {{ (quote.text.length > 60)? (quote.text | slice:0:60)+'..' :(quote.text) }} </p>
##

20+21+22+23.Modal Page:
#modified:   src/data/quotes.ts:
	//add new quote with long text 
#modified:   src/pages/favorites/favorites.html:
<ion-item *ngFor="let quote of quotes" ++(click)="openQuoteModal(quote)++">	
#modified:   src/pages/favorites/favorites.ts:
constuctor(private modalCtrl: ModalController){}
//---
openQuoteModal(quote:Quote){
  let modal = this.modalCtrl.create(QuotePage,quote);
  modal.present();
}
#modified:   src/pages/quote/quote.ts:
export class QuotePage{
  quote:Quote;
  constructor(private viewCtrl: ViewController,
              private navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.quote = this.navParams.data;
  }
  // ngOnInit(){
  //   console.log("aaaa");
  //   this.quote = this.navParams.data;
  //   console.log(this.quote);   
  // }

  onClose(){
    this.viewCtrl.dismiss();
  }
}
#modified:   src/pages/quote/quote.html:
<ion-header>
  <ion-navbar>
    <ion-title>{{quote?.person}}</ion-title>
  </ion-navbar>
</ion-header>

<ion-content text-center>
  <ion-card>
    <!-- <ion-card-header>
      Header
    </ion-card-header> -->
    <ion-card-content>
      {{quote?.text}}
    </ion-card-content>
    <ion-row>
      <ion-col>
        <button ion-button small outline color="danger">Unfavorite</button>
      </ion-col>
    </ion-row>
  </ion-card>
  <button ion-button color="danger" (click)="onClose()">Close</button>
</ion-content>

24.Passing Data from a Modal back to the Page:
#modified:   src/pages/quote/quote.html:
<button ion-button small outline color="danger" ++(click)="onClose(true)"++>Unfavorite</button>
#modified:   src/pages/quote/quote.ts:
onClose(++remove=false++){
#modified:   src/pages/favorites/favorites.ts:
openQuoteModal(quote:Quote){
  let modal = this.modalCtrl.create(QuotePage,quote);
  modal.present();
+ modal.onDidDismiss((remove:boolean)=>{
+   alert(remove);
+ })
}

25.Understanding ViewController Hooks:
willEnter: Observable, fired when a component is about to become active
didEnter: Observable, fired when a component has become active
willLeave: Observable, fired when a component is about to become inactive //not available any more.
didLeave: Observable, fired when a component has become inactive
willUnload: Observable, fired when a component has been distroyed
onWillDismiss: callback, called when current ViewController will be dismissed
onDidDismiss: callback, called when current ViewController was dismissed

26.Receiving Modal Data by Using the ViewController:
Any Page is a ViewController, ViewController don't have any relation with the stack of pages.
#src/pages/favorites/favorites.ts:
modal.onDidDismiss((remove:boolean)=>{
//alert(remove);
  this.quotesService.removeQuoteFromFavorites(quote);
});

27.Updating the "Favorite Quotes" Page:
#modified:   src/pages/favorites/favorites.ts:
//We have to reload the quotes from the service
//Or to delete the quote manually:
let pos = this.quotes.findIndex( (q: Quote)=>{
return q.id == quote.id;
});
this.quotes.splice(pos,1);

28.Adding an "Unfavorite" Functionality to the App:
#modified:   src/services/quotes.ts
isQuoteFavorite(quote:Quote){
    return this.favoriteQuotes.find( (q:Quote)=>{
        return q.id == quote.id;
    });
}
#modified:   src/pages/quotes/quotes.html
<button ion-button clear small *ngIf="!isFavorite(quote)" (click)="onAddToFavorites(quote)">Favorite</button>
<button ion-button clear small color="danger" *ngIf="isFavorite(quote)" (click)="onRemoveFromFavorites(quote)">Unfavorite</button>
#modified:   src/pages/quotes/quotes.ts
onRemoveFromFavorites(quote:Quote){
  this.quotesService.removeQuoteFromFavorites(quote);
}

isFavorite(quote:Quote){
  return this.quotesService.isQuoteFavorite(quote);
}

29.Revealing extra List Item Options upon Sliding:
#modified:   src/pages/favorites/favorites.html:
//<!-- <ion-list>
//  <ion-item *ngFor="let quote of quotes" (click)="openQuoteModal(quote)">
//    <h2>{{quote.person}}</h2>
//    <p>{{quote.text}}</p>
//  </ion-item>
//</ion-list> -->

<ion-list>

	<ion-item-sliding *ngFor="let quote of quotes">

		<ion-item (click)="openQuoteModal(quote)">
			<h2>{{quote.person}}</h2>
			<p>{{quote.text}}</p>
		</ion-item>

		<ion-item-options side="right">
			<button ion-button color="danger" outline (click)="onRemoveFromFavoritesQuotes(quote)">
			  <ion-icon name="trash"></ion-icon> Unfavorite
			</button>
		</ion-item-options>

	</ion-item-sliding>

</ion-list>
#modified:   src/pages/favorites/favorites.ts:
  onRemoveFromFavoritesQuotes(quote:Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
    //We have to reload the quotes from the service
    //Or to delete it from the local quotes manually:
    let pos = this.quotes.findIndex( (q: Quote)=>{
      return q.id == quote.id;
    });
    this.quotes.splice(pos,1);
  }
  
30.Changing the overall App Theme:
#modified:   src/theme/variables.scss:
	//Put Under //Shared variables:
	$content-padding:8px;
	
	+//  primary:    #488aff,
	+  primary:    #ffbb00,

31.Adding a Sidemenu:
#modified:   src/app/app.html
<ion-menu [content]="nav">
    <ion-header>
        <ion-toolbar>
            <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-list>
            <button ion-item (click)="onLoad(tabsPage)">
                <ion-icon name="quote" item-left></ion-icon>
                Quotes
            </button>
            <button ion-item (click)="onLoad(settingsPage)">
                <ion-icon name="settings" item-left></ion-icon>
                Settings
            </button>            
        </ion-list>
    </ion-content>

</ion-menu>

<ion-nav [root]="rootPage" #nav></ion-nav>

#modified:   src/app/app.component.ts
   rootPage:any = TabsPage;
+  tabsPage:any = TabsPage;
+  settingsPage:any = SettingsPage;
//---
+  onLoad(page:any){
+    this.rootPage=page;
+  }

32.How to change the Root Page:
The NavController is related to a page, or we are on the app.component, the NavController is not instatiated yet.
menuController : allow us to manage the menu.
#modified:   src/app/app.component.ts:
   settingsPage:any = SettingsPage;
+  @ViewChild('nav') nav : NavController;
//---
constructor(++private menuCtrl:MenuController++,...){...}
//---
   onLoad(page:any){
+    this.nav.setRoot(page);
+    this.menuCtrl.close(); //because menu doesn't close automatically.
   }

33.Adding a Menu Toggle Button to the Navigation Bar:
Full demo Ionic pulled from: https://github.com/ionic-team/ionic
App Conferance Demo: https://github.com/ionic-team/ionic-conference-app

1)Manually process:
#modified:   src/pages/favorites/favorites.html:
+    <ion-buttons left>
+      <button ion-button (click)="onOpenMenu()">
+        <ion-icon name="menu"></ion-icon>
+      </button>
+    </ion-buttons>

#modified:   src/pages/favorites/favorites.ts:
   constructor(  private quotesService: QuotesService,
                 private modalCtrl: ModalController,
+                private menuCtrl: MenuController,
//---
+  onOpenMenu(){
+    this.menuCtrl.open();
+  }

2)Automatic with a Directive that Ionic provide us : menuToggle
#modified:   src/pages/favorites/favorites.html && #modified:   src/pages/settings/settings.html:
+    <ion-buttons left>
+      <button ion-button menuToggle>
+        <ion-icon name="menu"></ion-icon>
+      </button>
+    </ion-buttons>

34.Preparing the Settings Page:
#modified:   src/pages/settings/settings.html:
<ion-content padding>

    <!-- <ion-list>

        <ion-item>
          <ion-label>Pepperoni</ion-label>
          <ion-toggle [(ngModel)]="pepperoni"></ion-toggle>
        </ion-item>
      
      </ion-list> -->
  
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-label>Alternative Background</ion-label>
      </ion-col>
      <ion-col>
        <ion-toggle (ionChange)="onToggle($event)" float-right></ion-toggle>
      </ion-col>
    </ion-row>
  </ion-grid>

</ion-content>

#	modified:   src/pages/settings/settings.ts:
  onToggle(toggle: Toggle){
    console.log(toggle);
  }

35.Creating and Using the Settings Service to Store Settings:
#src/services/settings.ts:
export class SettingsService{
    private altBackground:boolean= false;

    setBackground(isAlt:boolean){
        this.altBackground = isAlt;
    }

    isAltBackground(){
        return this.altBackground;
    }
}
#modified:   src/app/app.module.ts:
register SettingsService in providers Array
#modified:   src/pages/settings/settings.html:
-        <ion-toggle (ionChange)="onToggle($event)" float-right></ion-toggle>
+        <ion-toggle (ionChange)="onToggle($event)" [checked]="checkAltBackground()" float-right></ion-toggle>

#modified:   src/pages/settings/settings.ts
-  constructor() {
+  constructor(private settingsService:SettingsService) {
   }
 
   onToggle(toggle: Toggle){
     console.log(toggle);
+    this.settingsService.setBackground(toggle.checked);
+  }
+
+  checkAltBackground(){
+    return this.settingsService.isAltBackground();
   }

36.Adding an Alternative Item Background:
1) First Approach:
#modified:   src/pages/favorites/favorites.html:
-      <ion-item (click)="openQuoteModal(quote)">
+      <ion-item (click)="openQuoteModal(quote)" [color]="getBackground()">

#modified:   src/pages/favorites/favorites.ts:
+  getBackground(){
+    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
+  }

#modified:   src/theme/variables.scss:
+  quoteBackground: #d4986f,
+  altQuoteBackground: #c3b076,

2) Second Approach:
#modified:   src/pages/favorites/favorites.html
-      <ion-item (click)="openQuoteModal(quote)">
+      <ion-item (click)="openQuoteModal(quote)" color="quoteBackground" [ngClass]="{alt: getBackground()}">
#modified:   src/pages/favorites/favorites.scss
+    .alt{
+        background-color: color($colors, altQuoteBackground);
+    }
#modified:   src/pages/favorites/favorites.ts
+  getBackground(){
+    return this.settingsService.isAltBackground();
+  }
#modified:   src/theme/variables.scss
+  quoteBackground: #d4986f,
+  altQuoteBackground: #c3b076,

37.App Summary
38.Module Summary

If you got problems running it, you might be using a newer version of the Ionic CLI. Try npm run ionic:serve  after npm install in the project folder in such cases!

IV-Ionic 2 Components - A Closer Look:
1.Module Introduction
2.Another Look at the Component Docs:
Documentation degree 1 : Components
Documentation degree 2 : API

3.Using and Styling Buttons

outline/clear/round/block/full/small/large/icon-only/icon-left|icon-right(when setting text like "Home")
<button ion-button>
	<ion-icon  name="home"></ion-icon>Home
</button>

4.Understanding Lists:

<ion-list>
	<ion-item>Normal Item</ion-item>
	<button ion-item>Button Item</button>
</ion-list>
	
5.Understanding List Items and their Content:
item-left|right
Doc:Component: List (ion-avatar,etc)

<ion-list>
	<ion-item>
		<ion-icon name="star" item-left></ion-icon>
		<h1>Normal Item</h1> (<h2><p>,etc)
	</ion-item>

</ion-list>

6.Configuring Lists:
<ion-list no-lines inset>

7.Item Groups and List Headers:
//item group
<ion-item-group>
	<ion-item-divider>A</>
	<ion-item> Abrico </>
	<ion-item> Abrico </>
	<ion-item> Abrico </>
</>
//list header
<ion-list>
	<ion-list-header>A</>
	<ion-item> Abrico </>
	<ion-item> Abrico </>
	<ion-item> Abrico </>
</>
	
7.Bonus: How to create a re-orderable List

The <ion-list> element has a big advantage: It allows you to easily create a re-orderable list. Here are the steps/ the code to add this functionality.

// list.html in /pages folder
<ion-list reorder="true" (ionItemReorder)="reorderItems($event)">
    <ion-item *ngFor="let item of items">{‌{ item }}</ion-item>
</ion-list>
 
// list.ts in /pages folder
import { Component } from '@angular/core';
import { NavController, reorderArray } from 'ionic-angular';
 
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    items = ['Apples', 'Bananas', 'Berries'];
 
    reorderItems(indexes){
        this.items = reorderArray(this.items, indexes);
    }
}
This is all!

You need to set reorder  to true  (on <ion-list> ) and add a listener to the ionItemReorder  event. In the method executed on this event, you should simply use the reorderArray  method (which is provided by ionic-angular ) to reorder your array.

Done!

8.Ionic 3.0.0 and the Grid

The next lecture will explore the Ionic Grid - here's something you should watch out for!

If you're using Ionic 3.0.0 instead of 2.x (check your package.json to find out), you need to update some parts of the grid (the properties mainly): http://blog.ionic.io/build-awesome-desktop-apps-with-ionics-new-responsive-grid/

Specifically, you should change width-*  to col-*  and also adjust to a 12 column grid. So width-50  becomes col-6  (50% of 12 = 6).

The same for offset-* . That also switches to 12 columns, so offset-50  becomes offset-6 .
	
9.Understanding the Grid System:

//col 1 col 2 : equal size
<ion-grid>
	<ion-row>
		<ion-col>col1</>
		<ion-col>col2</>
	</>
</>

//resizing:
<ion-grid>
	<ion-row>
		<ion-col col-2>col1</>
		<ion-col>col2</>
	</>
</>

//Working with col-x and offset-x

10.More than (click) - Using Gestures:
Doc/Components/gesture:
Tap,Press,Panned,Swiped

11.Creating and Using Custom Components:
creating #components/:
#components/touch-event-component.ts:
Normal component which we are goind to invoke by its selector in another template of a Page.

12.Time to Practice - Components - Problem:
13.Time to Practice - Components - Solution

Event Emitter from a directive to the parent component:
#child component:
champ:
@Output() didReset = new EventEmitter <string>();

onReset(str:string){
	this.didReset.emit(str);
}
#parent component:
<child-directive (didReset)="onDidReset($event)"></>
//---
onDidReset(str:string){
	console.log(str);	
}

14.Module Summary:

V-Running an Ionic 2 App on a Real Device (or an Emulator):
1.Module Introduction:
	Running the App on Android Device
	Running the App on Iphone Device
2.Where to get started
3.Building for iOS
	Only down in IOS machine:
	install xcode in IOS
	enable it for Cordova
		> xcode-select --install
	>sudo npm install -g ios-deploy --unsafe-perm=true
	in our project folder: 
	> ionic platform add ios 
	> ionic build ios
	open the project in xcode
		open project:
		browse & select: ios/ionic2-course.xcodeproj
	+++To Continue Later
4.Building for Android
1)Install JDK
2)Install Android Studio
3)In Our Project:
	ionic cordova platform add android
	ionic build android
4)Android Studio Import MyApp/Platform/android
5)Configure a simulator devise
+++RATE
..
ionic cordova run android --device => Your app has been deployed

5)Lists & Performance issues:
6)Step-by-step Guide for Building for iOS and Android
7)Module Summary

VI-"The Recipe Book" App (User Input, Forms and Data Management):
1.Module Introduction:
	Module Content:
		Usage of more built-in Ionic 2 Components
		Handle User Input
		Template-driven and Reactive Forms Approach

2.What we're going to build
	App Overview
	
3.Breaking the App into Pieces (Defining the App Structure)
	App Structure pages

4.Creating the required Pages
NavPush vs NavPop
<button ion-button [navPush]="pushPage" [navParams]="params">Go</button>
<button ion-button navPop>Go Back</button>

Open Select progmatically:
#page.ts (component)
@ViewChild('ingrediantAlertSelect') ingrediantAlertSelect : Select;
//---
onManageIngrediant(){
this.ingrediantAlertSelect.open();
}
#page.html:
<ion-item>
  <ion-label>Mute Notifications</ion-label>
  <ion-select [(ngModel)]="notifications" #ingrediantAlertSelect interface="action-sheet">
	<ion-option value="mute_15">For 15 Minutes</ion-option>
	<ion-option value="mute_1">For 1 Hour</ion-option>
	<ion-option value="mute_23">For 24 Hours</ion-option>
	<ion-option value="mute_inf">Until I turn it back on</ion-option>
  </ion-select>
</ion-item>

Ionic Form:
https://ionicframework.com/docs/developer-resources/forms/ 

#correctionShop:
* in tabs page template no header no content directly: <ion-tabs>...
* he used tabIcon instead of name in ion-tabs attributes
* modify just primary and secondary colors and the tabs are automatically themed*
*form in ionic : 

108.Template driven Vs Reactive Form:
0.My form:
  <form (ngSubmit)="addAction(name.value,amount.value)">

    <ion-list>
      <ion-item>
        <ion-label floating>Name</ion-label>
        <ion-input #name type="text" clearInput></ion-input>
      </ion-item>
    
      <ion-item>
        <ion-label floating>Amount</ion-label>
        <ion-input #amount type="number" min="0" clearInput></ion-input>
      </ion-item>
      <br>
      <div>
        <button ion-button block type="submit">Add</button>
      </div>
    </ion-list>

  </form>
  
1.Template Driven Approach:
!!!don't forget the name attribute for the inputs

#shopping-list.html:
  <form #f="ngForm" (ngSubmit)="addAction(f)">

    <ion-list>
      <ion-item>
        <ion-label fixed>Name</ion-label>
        <ion-input ngModel name="name" required type="text" clearInput></ion-input>
      </ion-item>
    
      <ion-item>
        <ion-label fixed>Amount</ion-label>
        <ion-input ngModel name="amount" required type="number" min="1" clearInput></ion-input>
      </ion-item>
      <br>
      <div>
        <button ion-button block type="submit" [disabled]="!f.valid" >Add</button>
      </div>
    </ion-list>

  </form>

#shopping-list.ts:
	addAction(form:NgForm){
		console.log(form);
		form.reset();
	}
2.Reactive Approach:
#new-recipe.html:
  <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
    <ion-list>
      <ion-item>
        <ion-label floating>Title</ion-label>
        <ion-input
          type="text"
          formControlName="title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Description</ion-label>
        <ion-textarea formControlName="description"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label floating>Difficulty</ion-label>
        <ion-select formControlName="difficulty">
          <ion-option
            *ngFor="let option of selectOptions"
            [value]="option">{{ option }}</ion-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <button
      type="button"
      clear
      ion-button
      block
      (click)="onManageIngredients()">Manage Ingredients</button>
    <ion-list formArrayName="ingredients">
      <ion-item
        *ngFor="let igControl of recipeForm.get('ingredients').controls; let i = index">
        <ion-label floating>Name</ion-label>
        <ion-input type="text" [formControlName]="i"></ion-input>
      </ion-item>
    </ion-list>
    <button
      type="submit"
      ion-button
      block
      [disabled]="!recipeForm.valid">{{ mode }} Recipe</button>
  </form>
#new-recipe.ts:


2.Form : Reactive Approach:
ion-textarea
button role : cancel | destructive
#edit-recipe.html:
	<ion-content padding>
	  <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
		<ion-list>
		  <ion-item>
			<ion-label floating>Title</ion-label>
			<ion-input
			  type="text"
			  formControlName="title"></ion-input>
		  </ion-item>
		  <ion-item>
			<ion-label floating>Description</ion-label>
			<ion-textarea formControlName="description"></ion-textarea>
		  </ion-item>
		  <ion-item>
			<ion-label floating>Difficulty</ion-label>
			<ion-select formControlName="difficulty">
			  <ion-option
				*ngFor="let option of selectOptions"
				[value]="option">{{ option }}</ion-option>
			</ion-select>
		  </ion-item>
		</ion-list>
		<button
		  type="button"
		  clear
		  ion-button
		  block
		  (click)="onManageIngredients()">Manage Ingredients</button>
		<ion-list formArrayName="ingredients">
		  <ion-item
			*ngFor="let igControl of recipeForm.get('ingredients').controls; let i = index">
			<ion-label floating>Name</ion-label>
			<ion-input type="text" [formControlName]="i"></ion-input>
		  </ion-item>
		</ion-list>
		<button
		  type="submit"
		  ion-button
		  block
		  [disabled]="!recipeForm.valid">{{ mode }} Recipe</button>
	  </form>
	</ion-content>
#edit-recipe.ts:
  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
  
  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }

    let rec:Recipe=new Recipe(value.title, value.description, value.difficulty, ingredients);
    if (this.action == 'edit') {
      this.recipesService.updateRecipe(this.index,rec);
    } else {
      this.recipesService.addRecipe(rec);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }  

//126.Managing Ingredient Controls in a FormArray


VII-"The Extended Recipe Book" App (Auth and Http):
1.Module Introduction
2.What we're going to build
3.Which New Features We're Going to Add
4.Generating the Required Pages
signup
signin
5.Adding a Sidemenu
#app.html:
<ion-menu [content]="nav">

    <ion-header>
        <ion-toolbar color="secondary">
            <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button ion-item (click)="onLoad(tabsPage)">
            <ion-icon name="book" item-left></ion-icon>
            Recipes
        </button>
        <button ion-item (click)="onLoad(signinPage)">
            <ion-icon name="log-in" item-left></ion-icon>
            Sign in
        </button> 
        <button ion-item (click)="onLoad(signupPage)">
            <ion-icon name="person" item-left></ion-icon>
            Sign up
        </button>
        <button ion-item (click)="onLogout()">
            <ion-icon name="log-out" item-left></ion-icon>
            Logout
        </button>                  
      </ion-list>
    </ion-content>

  </ion-menu>

<ion-nav [root]="rootPage" #nav></ion-nav>

#app.component.ts:
export class MyApp {
  rootPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close(); 
  }

  onLogout(){

  }
}

6.Creating the Signup Page (and Form)
7.Creating the Signin Page
8.How Authentication Works in an Ionic 2 (Mobile) App
9.Setting up Firebase (as a Development Backend)
>npm install --save firebase
#app.component.ts:
import firebase from 'firebase';
//---
constrctor(...){
	firebase.initializeApp({
      apiKey: "AIzaSyAUUzjPzbPxgPPrC09JabsSkdnQAQfmjAg",
      authDomain: "ionic3-recipebook-eb262.firebaseapp.com",
    });
	//...
}
10.Implementing the Signup Process
11.Showing a Loader (Spinner) and Error Alert
12.Implementing the Signin Process
13.Refining the Signin Page

#auth.service.ts:
import firebase from 'firebase';

export class AuthService{

    signup(email:string,password:string){
        return firebase.auth().createUserWithEmailAndPassword(email,password);
    }

    signin(email:string,password:string){
        return firebase.auth().signInWithEmailAndPassword(email,password);
    }

}

#signup.ts:
  onSignUp(form:NgForm){

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();    

    this.authService.signup(form.value.email,form.value.password)
    .then(data=>{
      console.log(data);
      loader.dismiss();
    })
    .catch(error=>{
      console.log(error);
      loader.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Sign Up Error',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();

    });
  }
#signin.ts:
//same as signup.ts just call the service method sign in

14.Managing the User State
#modified:   src/app/app.component.ts

constructor(...){
     firebase.initializeApp({
       apiKey: "AIzaSyAUUzjPzbPxgPPrC09JabsSkdnQAQfmjAg",
       authDomain: "ionic3-recipebook-eb262.firebaseapp.com",
     });
 
+    firebase.auth().onAuthStateChanged(user=>{
+      if(user){
+        this.isAuthenticated = true;
+        this.nav.setRoot(this.rootPage);
+      }else{
+        this.isAuthenticated = false;
+        this.nav.setRoot(this.signinPage);        
+      }
+    })
}	
//---
   onLogout(){
-    
+    this.authService.logout();
+    this.menuCtrl.close();
   }

#modified:   src/app/app.html:
-        <button ion-item (click)="onLoad(signinPage)">
+        <button ion-item (click)="onLoad(signinPage)" *ngIf="!isAuthenticated">
//apply that for the four button tabspage,signin,signup,logout

#modified:   src/services/auth.service.ts
+    logout(){
+        firebase.auth().signOut();
+    }

15.How Firebase stores the Token
16.Adding a Popover Component:
	#src/pages/shopping-list/shopping-list-options/shopping-list-options.ts
	#modified:   src/app/app.module.ts
	#modified:   src/pages/shopping-list/shopping-list.html
	#modified:   src/pages/shopping-list/shopping-list.ts

	1)Creating a new compoenent that will be considered like a page:
	#src/pages/shopping-list/shopping-list-options/shopping-list-options.ts:
	import { Component } from "@angular/core";
	import { ViewController } from 'ionic-angular';

	@Component({
		selector: 'page-sl-options',
		template: `
			<ion-grid text-center>
				<ion-row>
					<ion-col>
						<h3>Store & Load</h3>
					</ion-col>
				</ion-row>
				<ion-row>
					<ion-col>
						<button ion-button outline (click)="onAction('load')">Load List</button>
					</ion-col>
				</ion-row>
				<ion-row>
					<ion-col>
						<button ion-button outline (click)="onAction('store')">Save List</button>
					</ion-col>
				</ion-row>                      
			</ion-grid>
		`
	})
	export class ShoppingListOptions{
		constructor(private viewCtrl: ViewController){}

		onAction(action:string){
			this.viewCtrl.dismiss(action);
		}
	}

	2)Register it in the app.module.ts
	#modified:   src/app/app.module.ts

	3)Adding a more button
	#modified:   src/pages/shopping-list/shopping-list.html
	+        </ion-buttons>
	+        
	+        <ion-buttons right padding-right>
	+          <button ion-button icon-only (click)="onShowOptions($event)">
	+            <ion-icon name="more"></ion-icon>
	+          </button>
	+        </ion-buttons>

	4)popover action:
	#modified:   src/pages/shopping-list/shopping-list.ts
	+  onShowOptions(event: MouseEvent){
	+    let popover = this.popoverCtrl.create(ShoppingListOptions);
	+    popover.present({ev:event});
	+  }

17.Fetching the Token:
18.Ionic and Http:
19.Sending a PUT Request with the Auth Token

#modified:   src/app/app.module.ts
//Importing HttpClientModule in the app module: (import array)
#modified:   src/pages/shopping-list/shopping-list.ts:
  onShowOptions(event: MouseEvent){
    let popover = this.popoverCtrl.create(ShoppingListOptions);
    popover.present({ev:event});

+   popover.onDidDismiss(data=>{
+     if (data && data.action == 'load'){
+
+     }else{
+       this.authService.getActiveUser().getToken()
+       .then(token=>{
+         this.shoppingListService.storeList(token)
+           .subscribe( data => {
+             console.log("tayyeb");
+             console.log(data);            
+           }
+             // ()=>console.log('success'),
+             // (error) => console.log("error")
+             
+           );
+       })
      }
    });
  }
#modified:   src/services/auth.service.ts:
+    getActiveUser(){
+        return firebase.auth().currentUser;
+    }

#modified:   src/services/shoppingList.service.ts
//Injecting HttpClient service into the shoppingListService
//=> We must add @Injectable() to do this:
    storeList(token:string){
      let userId = this.authService.getActiveUser().uid;
      //put ecraser l'ancienne list / post pour ajouter a l'ancienne liste
      return this.http.put("https://ionic3-recipebook-eb262.firebaseio.com/"+userId+"/shopping-list.json?auth="+token,this.ingredients)
      // .map( (response:Response)=>{
      //   return response;
      // });
      .pipe(
        tap((response) => console.log('aaa'+response )),
        catchError(error => of(`Bad Promise: ${error}`))
      );
    }
    
20.More about tokens:
Json Web Token officiel doc: 
	https://jwt.io/introduction/

21.Sending a GET Request to load Data:
#shopping-list.ts:
    popover.onDidDismiss(action=>{
      if (action && action == 'load'){
        this.authService.getActiveUser().getToken()
        .then(token=>{
          this.shoppingListService.fetchList(token)
            .subscribe( (data: Ingredient[]) => {
              if (data)
                this.ingredients = data; 
              else 
                this.ingredients = []; 
            });
        })        
      }else{
		
#shoppingList.service.ts:
    fetchList(token:string){
      let userId = this.authService.getActiveUser().uid;
      return this.http.get("https://ionic3-recipebook-eb262.firebaseio.com/"+userId+"/shopping-list.json?auth="+token)
      .map( (res)=>{
        return <Ingredient[]>res;
      })
      .do( (data) =>{
        this.ingredients = data;
      })
    }
    

22.Polishing the App (Adding a Spinner and Error Handling)
//Adding Loading for load & saving and Alert for Error loading or saving:
#shopping-list.ts:
  let loading = this.getLoadign();
  loading.present();
  loading.dismiss();
  
  this.showAlert("Error","Try to do again");

  getLoading() {
    return this.loadingCtrl.create({
      content: "Please wait...",
    });  
  }

  showAlert(title,subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }  

23.Fixing the Error Handler:
//error returned after subscribe is a Response type so to acceed to the error message we have to make error.error.error
#modified:   src/pages/shopping-list/shopping-list.ts
   -this.showAlert("Loading Error","Try to load again");
   +this.showAlert("Loading Error",error.error.error);
  

24.Storing and Fetching Recipes:
	//Copying the same job just make shoppingListOptions directly under pages and rename it for reusable purposes to DatabaseOptions
25.Fixing Errors
//Issue 1: When we sotre recipe without ingrediants it will be loaded without ingrediants property => error when trying to add ingrediants
        .map( (res)=>{
          let recipes = <Recipe[]>res;
          for (let recipe of recipes){
              if(!recipe.hasOwnProperty('ingredients'))
                recipe.ingredients = [];
          }
          return recipes;
          
        })
        .do( (data) =>{
            let recipes = <Recipe[]>data;
            for (let recipe of recipes){
                if(!recipe.hasOwnProperty('ingredients'))
                  recipe.ingredients = [];
            }          
            if (recipes)
                this.recipes = recipes;
            else 
                this.recipes = [];
        })
//Issue2: when clicking popover without clicking outside it without doing any action:
+    popover.onDidDismiss(action=>{
+      if(!action)
+        return;
	 //.....
	 
VIII-"Awesome Places" App (Native Device Features, Storage):
1.Module Introduction
2.What we'll build
3.Generating the required Pages
	ionic start awsome-places
	ionic g page X
4.Creating Models for Location and Places
5.Implementing Navigation
	//button add for nav
6.Filling the "New Place" Page with Life (incl. Template-Driven Form):
//Creating a big Template Driven form + onSubmit in the TS:
#modified:   src/pages/add-place/add-place.html
#modified:   src/pages/add-place/add-place.ts

7.Using Angular Google Maps
1)Install
>npm install @agm/core --save
2)Import
#app.module.ts:
+import { AgmCoreModule } from '@agm/core';
//---
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
+   AgmCoreModule.forRoot({
+     apiKey: "AIzaSyCbBDCr9IkMVkRbfaBJxfA-MCQDcW7G5SU"
+   }),
  ],
3)Usage:
#html
<agm-map [latitude]="lat" [langitude]="lan" (mapClick)="onChoseLocation($event)">
	<agm-marker [latitude]="lat" [langitude]="lan" *ngIf="locationChosen"></agm-marker>
</agm-map>
#css
agm-map{
	height:400px;
#ts
class{
	lat:number
	lan:number
	locationChosen = false
	onChoseLocation(event){
		console.log(event);
		this.lat = event.coords.latitude;
		this.lan = event.coords.langitude;
		this.locationChosen = true;
	}	

8.Adding Google Maps to the App
>npm install @agm/core --save
#app.module.ts:
+import { AgmCoreModule } from '@agm/core';
//---
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
+   AgmCoreModule.forRoot({
+     apiKey: "AIzaSyCbBDCr9IkMVkRbfaBJxfA-MCQDcW7G5SU"
+   }),
  ],
#add-place.ts
+  onOpenMap(){
+    let modal = this.modalCtrl.create(SetLocationPage);
+    modal.present();
+  }
#set-location.html
+  <ion-grid>
+    <ion-row>
+      <ion-col>
+        <agm-map>
+          
+        </agm-map>
+      </ion-col>
+    </ion-row>
+  </ion-grid>
#set-location.scss
+    agm-map{
+        height:250px;
+    }

9.Configuring our Maps
#modified:   src/pages/add-place/add-place.ts
+  location:Location = {lat:36.731470384526965, lan:10.210593179614534};
//---
+    let modal = this.modalCtrl.create(SetLocationPage,{ loca
tion:this.location } );
#modified:   src/pages/set-location/set-location.html
+    <agm-map [latitude]="location.lat" [longitude]="location.lan" [zoom]="16">
#modified:   src/pages/set-location/set-location.ts
+  location:Location;
//---
+  constructor(private navParams: NavParams) {
+    this.location = this.navParams.get('location');

10.Allowing the User to Place a Marker on the Map
11.Passing the Chosen Location back to the Page
12.Displaying the Chosen Location
//Shoose Location + Pass Location back from the model to the page + display the Chosen Location:

#modified:   src/pages/set-location/set-location.html
 <agm-map [latitude]="location.lat" [longitude]="location.lan" [zoom]="16" ++(mapClick)="onSetMarker($event)"++>
+   <agm-marker [latitude]="marker.lat" [longitude]="marker.lan" *ngIf="marker"></agm-marker>
//---
<ion-row>
  <ion-col>
    <button ion-button block color="secondary" (click)="onConfirm()" 
      [disabled]="!marker">Confirm</button>
  </ion-col>
  <ion-col>
    <button ion-button block color="danger" (click)="onAbort()">Abort</button>
  </ion-col>
</ion-row>

#modified:   src/pages/set-location/set-location.ts
+  marker:Location;
constructor(private navParams: NavParams,
            private viewCtrl: ViewController) {
  this.location = this.navParams.get('location');
+ if ( this.navParams.get('isSet') )
+    this.marker = this.location;         
}
//---
onSetMarker(event:any){
  //console.log(event); //=> coords.lat,coords.lng
  this.marker = new Location(event.coords.lat,event.coords.lng);
}

onConfirm(){
  this.viewCtrl.dismiss({location:this.marker});
}

onAbort(){
  this.viewCtrl.dismiss();
}

#modified:   src/pages/add-place/add-place.ts
  onOpenMap(){
    let modal = this.modalCtrl.create(SetLocationPage,{ location:this.location,isSet:this.locationIsSet } );
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.location = data.location;
        this.locationIsSet = true;
      }
    })
  }
#modified:   src/pages/add-place/add-place.html
    <ion-row *ngIf="locationIsSet">
      <ion-col>
          <agm-map [latitude]="location.lat" [longitude]="location.lan" [zoom]="16">
            <agm-marker [latitude]="location.lat" [longitude]="location.lan" >

            </agm-marker>
          </agm-map>
      </ion-col>
    </ion-row>
    //---
    <ion-row>
      <ion-col>
        <button ion-button color="secondary" block type="submit" 
          [disabled]="!f.valid || !locationIsSet">
          Add this Place
        </button>
      </ion-col>
    </ion-row>
    
#modified:   src/pages/add-place/add-place.scss
page-add-place {
    agm-map{
        height:250px;
    }
}

13.Using Ionic Native 3 instead of 2
Docs:
	https://blog.ionicframework.com/ionic-native-3-x/
	https://github.com/ionic-team/ionic-native/blob/master/README.md

14.Using a Native Device Feature: Geolocation to Locate the User
	//>>>part1:
	>ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
	//>>>part2:
	>npm install --save @ionic-native/geolocation
	
	//>>>part3:
	1) Import the native plugin:
	#modified:   src/app/app.module.ts
	+import { Geolocation } from '@ionic-native/geolocation';
	//---
    providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
+     Geolocation
    ]
	2)Usage:
	#modified:   src/pages/add-place/add-place.ts
	+import { Geolocation } from '@ionic-native/geolocation';
	//---
    constructor(private modalCtrl:ModalController,
-               ) {
+               private geolocation: Geolocation
+             ) {
    }
	//---
    onLocate(){
      this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.location.lat = resp.coords.latitude;
        this.location.lan = resp.coords.longitude;
        this.locationIsSet = true;
       })
       .catch((error) => {
         console.log('Error getting location', error);
       });
    }	

15.Polishing the Auto-Locate-Feature
//using loading and toasts for presenting the "locate me" button

16.Using a Native Device Feature: The Camera
17.Displaying the Picture
#modified:   config.xml
#modified:   package-lock.json
#modified:   package.json
#modified:   src/app/app.module.ts
	//import native plugin Camera
	//Insert it into providers array
#modified:   src/pages/add-place/add-place.ts
	//copy camera usage from doc into our function:
  onTakePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     #let base64Image = 'data:image/jpeg;base64,' + imageData; // I've commented this line to be like what he has done in the Tuto.
     this.imageUrl = imageData;
    }, (err) => {
     // Handle error
    });
  }

18.Managing Data with the PlacesService
#src/services/
//Creating placesServices to store Images
#modified:   src/app/app.module.ts
//registering placesServices	
#modified:   src/models/place.ts
//Rename class attributes
#modified:   src/pages/add-place/add-place.html
//setting src=ImageUrl
#modified:   src/pages/add-place/add-place.ts
//adding submit form using placesService:
  onSubmit(form:NgForm){
    console.log(form.value);
    let f = form.value;
    this.placesService.addPlace(f.title,f.description,this.location,this.imageUrl);
    form.reset();
    this.initModel();
  }

  initModel(){
    this.location = {lat:36.731470384526965, lan:10.210593179614534};
    this.locationIsSet = false;
    this.imageUrl = '';
  }
#modified:   src/pages/home/home.ts
+  ionViewWillEnter(){
+    this.places = this.placesService.loadPlaces();
+  }
#modified:   src/pages/home/home.html
//show places with card *ngFor

19+20.Configuring the Single Place Page + Reflecting on our App
#modified:   src/pages/home/home.html
  <ion-card *ngFor="let place of places; let i=index" (click)="onOpenPlace(place,++i++)">
#modified:   src/pages/home/home.ts
  onOpenPlace(place:Place,i:number){
    let modal = this.modalCtrl.create(PlacePage,{place,i});
    modal.present();
#modified:   src/pages/place/place.html
<ion-content padding>
  <ion-grid>
    <ion-row>
      <ion-col>
        <img [src]="place.imageUrl">
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <agm-map [latitude]="place.lat" [longitude]="place.lan">
          <agm-marker [latitude]="place.lat" [longitude]="place.lan"></agm-marker>
        </agm-map>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <button ion-button block (click)="onLeave()">Leave</button>
      </ion-col>
      <ion-col>
        <button ion-button block color="danger" (click)="onDelete()">Delete</button>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
#modified:   src/pages/place/place.scss
    agm-map{
        height:400px;
    }
#modified:   src/pages/place/place.ts
export class PlacePage {
  place:Place;
  index:number;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService: PlacesService) {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get("i");
  }

  onLeave(){
    this.viewCtrl.dismiss();
  }

  onDelete(){
    this.placesService.deletePlace(this.index);
    this.onLeave();
  }
#modified:   src/services/places.service.ts
    deletePlace(index:number){
        this.places.splice(index,1);
    }

20.5.OnDidDismiss of model card:

xx.First Android Emulation:
xx.test2 : correction of camera plugin (just copy the code of the doc)

	

21.Using a Native Device Feature The File System to manage Files
//Stocking photos taked by the camera.


pre
Text:
text-left / text-right / text-center
text-nowrap / text-wrap
text-justify / 
text-uppercase / text-lowercase / text-capitalise 

Padding:
padding / no-padding
padding-top / padding-right / ...
padding-horizontal / padding-vertical

Margin:
margin / no-margin
margin-top / margin-right / ...
margin-horizontal / margin-vertical

secondary : ( base : blue,
			  contrast : black ),

Trucs:
1.When starting application, we have to encrease response time to allow slower mobiles:
	#config.xml:
	+    <preference name="loadUrlTimeoutValue" value="60000"/>
 
2.Emulation bugs:
delete page declaration from declaration array in page.module.ts

3.GeoLocation:
#platforms/android/CordovaLib/AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="org.apache.cordova" android:versionName="1.0" android:versionCode="1">
    <uses-sdk android:minSdkVersion="16" />

+   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
+   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
+   <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
    
</manifest>

#app.module.ts:
//declare module in providers
#add-place.ts:
  geolocationOptions : GeolocationOptions;
  currentPosition : Geoposition;

  onLocate(){

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            //alert('Request successful');
            this.getLocation();            
          },
          error => {            
            alert('Please activate your GPS');
          }
        );
      }
    
    });

  }

//---

  getLocation(){

    let loader = this.loadingCtrl.create({
      content: "Getting your location..."
    });
    loader.present();

    this.geolocationOptions = {
      timeout:20000,
      enableHighAccuracy:false,
    }

    this.geolocation.getCurrentPosition(this.geolocationOptions)
    .then((resp:Geoposition) => {
        loader.dismiss();
        this.location.lat = resp.coords.latitude;
        this.location.lan = resp.coords.longitude;
        this.locationIsSet = true;
     })
     .catch((error) => {
        loader.dismiss();
        // alert(JSON.stringify(error))
        let message;
        switch(error.code) { 
          case 1: { 
            //PERMISSION_DENIED
            message = "The page didn't have the permission to do geolocation"; 
            break; 
          }
          case 2: {
            //POSITION_UNAVAILABLE
            message = "The geolocation failed! Try again...";
            break; 
          }
          case 3: {
            //Timeout
            message = "Your device is very slow! Please Try again...";
            break; 
          }
          default: { 
            message = "Error while trying to get your location";
            break;
          }
        }
        alert(message);
        if(error.code == 2)
          this.onLocate();

        let toast = this.toastCtrl.create({
          message: 'Couldn\'t get location, please pick it manually',
          duration: 3000,
        });
        toast.present();        
     });    

  }

4.ionic cordova build android bug:
>sudo npm install -g cordova@7.1.0

>ionic cordova platform remove android
>ionic cordova platform add android@6.3.0

>adb devices
>ionic cordova build android
>cordova run android

5.Update Cordova:
> sudo npm install -g cordova
#delete node_modules/
#delete package_lock.json
> npm i
//update android platform
>ionic cordova platform remove android
>ionic cordova platform add android

Ionic Native Page Transitions:
	https://www.youtube.com/watch?time_continue=3&v=4axQp0wfMtU
Ionic Upload Image to Node server:
	https://www.youtube.com/watch?v=e_HRX06Lb_k
	https://www.youtube.com/watch?v=uOK3_BbynRE
Ionic QR Code Generator & Reader
	https://www.youtube.com/watch?v=2N6MZVULgDM
Ionic text recognizing (OCR: Optical character recognition):
	https://github.com/matiastucci/ionic-ocr-example
	https://forum.ionicframework.com/t/ionic-ocr-example/35899
	https://www.sitepoint.com/image-recognition-with-the-google-vision-api-and-ionic/
Ionic face detection
	https://www.youtube.com/watch?v=FwIjHz1x_KU
	https://github.com/sorxrob/ionic-vision

Hacking CSS in ionic
	https://www.youtube.com/watch?v=sXFmkdhOEVc&index=4&list=PLvLBrJpVwC7piPgR6u165HAnr-2Z80etB

To See:
https://www.djamware.com/post/5a629d9880aca7059c142976/build-ionic-3-angular-5-and-firebase-simple-chat-app : code github linked in the page

Ionic 3arabi Firebase:
https://www.youtube.com/watch?v=YfgD0aJdyiY&list=PLMYF6NkLrdN9yeclmM6hg5FoRkvOkswos&index=13

#for Debug:
  debugError(object){
    var output = '';
    for (var property in object) {
      output += property + ': ' + object[property]+'; ';
    }
    alert(output);    
  }


//Bugs:
1. I can't handle Google Maps Callback:
	https://www.joshmorony.com/using-google-maps-and-geolocation-in-ionic-with-capacitor/
2. Link Polyline addPoint , removePoint (y) => I had used it.


Zebla :

Event:
google.maps.event.addListener( this.map,'dragend', function(e) {
  console.log(e);
  console.log(markerP);
  //this.markerP.position = e.latLng;
  markerP.bindTo('position',this.map,'center');
});
    
    
Shape:
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: origin,
      radius: Math.sqrt(50000) * 100
    });
    
Google Map API Events Doc:
https://developers.google.com/maps/documentation/javascript/events

Google Maps API methods : getCenter(),etc:
	https://developers.google.com/maps/documentation/javascript/reference/3/

Google Maps API Map Options: zoom,minZoom,color,etc
	https://developers.google.com/maps/documentation/javascript/reference/3/?csw=1#MapOptions

Icon Direction google maps == google map marker with heading:
https://stackoverflow.com/questions/25303797/let-arrow-marker-point-in-the-direction-of-another-marker


cordova-android versions:
	https://www.npmjs.com/package/cordova-android?activeTab=versions

Zebla:
#directive ngIf,disabled,color conditionnel:
  <ion-fab class="undo-button" right >
    <button ion-fab color="light" (click)="undoPoint()" mini [color]="markers.length > 0 ? 'danger' : 'danger'" *ngIf="markers.length > 0" [disabled]="markers.length == 0">
      <img src="assets/icon/undo.png" width="70%"> {{markers.length}}
    </button>
  </ion-fab> 

#Google Map : slow panTo javascript:
	https://codepen.io/ErDmKo/pen/Jdpmzv
	https://codepen.io/j4k/pen/gPmdWN
	
#Google Map: Triangle opacity:
	https://codepen.io/kbowerma/pen/nlCme?editors=1010
	
#Google Map : Marker animation
	https://developers.google.com/maps/documentation/javascript/examples/marker-animations

geolocation + autocomplete ionic exple :
	https://github.com/ionicthemes/ionic-2-google-maps-google-places-geolocation.git

background geolocation It (not free, solution payante)
	https://www.transistorsoft.com/shop/products/cordova-background-geolocation

Bug ionic serve:
	"ionic:serve": "ionic-app-scripts serve"

=MATERIAL:
1) npm install --save @angular/material @angular/animations @angular/cdk

2) #app.module.ts
	+import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
	//---
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
	+	BrowserAnimationsModule,
3) cp node_modules/ionic/config/copy_config.js ./config/.

4) #config/copy_config.js:
	+    copyMaterialThemeCSS: {
	+        src: ['{{ROOT}}/node_modules/@angular/material/prebuilt-themes/indigo-pink.css'],
	+        dest: '{{WWW}}/assets'
	+    }

5) #package.json
	+  "config": {
	+    "ionic_copy": "./config/copy.config.js"
	+  }
6) #index.html
	  <link href="build/main.css" rel="stylesheet">
	+ <link href="assets/indigo-pink.css" rel="stylesheet">

7)Source :
	https://www.youtube.com/watch?v=zvKRKAg3Wu4
	https://github.com/JahlomP
	https://material.angular.io/

ToSee other day : https://github.com/ionicthemes

Ionic Animations with Native CSS:
	https://www.youtube.com/watch?time_continue=601&v=WUweWDFVfTg
Ionic Animation with Lottie
	https://www.youtube.com/watch?v=72FdBqf1YjY
	
Ionic Animations:
	https://devdactic.com/animations-ionic-app/

CUSTOM SPLASH SCREEN IONIC : 
	https://www.youtube.com/watch?v=dPUmskG_-y0
	https://www.youtube.com/watch?v=_DdqcjmHOHQ
