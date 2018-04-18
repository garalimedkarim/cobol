diff --git a/src/pages/home/home.ts b/src/pages/home/home.ts
index ab73df8..02facbe 100644
--- a/src/pages/home/home.ts
+++ b/src/pages/home/home.ts
@@ -25,7 +25,9 @@ export class HomePage {
     this.map = new google.maps.Map(this.mapElement.nativeElement, {
       zoom: 16,
       center: origin,
-      mapTypeId: 'roadmap'
+      mapTypeId: 'roadmap',
+      zoomControl: false,
+      streetViewControl: false,
     });
     this.map.setCenter(origin);
 
@@ -42,7 +44,7 @@ export class HomePage {
 		  //position: new google.maps.LatLng(origin),
 		  map: this.map,
       animation: google.maps.Animation.DROP,
-      icon: icon,
+      icon: "../../assets/icon/men.png",
       //content : "aaaaaaaaaaa",
     });
     
@@ -71,6 +73,11 @@ export class HomePage {
     //   center: origin,
     //   radius: Math.sqrt(50000) * 100
     // });
+
+    var centerControlDiv = document.createElement('div');
+    var centerControl = new this.CenterControl(centerControlDiv, this.map);
+
+    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
   
   }  
 
@@ -94,4 +101,38 @@ export class HomePage {
      
   }
 
+    CenterControl(controlDiv, map) {
+
+    // Set CSS for the control border.
+    var controlUI = document.createElement('div');
+    controlUI.style.backgroundColor = 'white';
+    controlUI.style.border = '1px solid white';
+    controlUI.style.borderRadius = '50%';
+    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
+    controlUI.style.cursor = 'pointer';
+    controlUI.style.marginBottom = '22px';
+    controlUI.style.marginRight = '8px';
+    controlUI.style.textAlign = 'center';
+    controlUI.title = 'Click to recenter the map';
+    controlDiv.appendChild(controlUI);
+
+    // Set CSS for the control interior.
+    var controlText = document.createElement("IMG");
+    controlText.setAttribute("src", "../../assets/icon/current_location.png");
+    controlText.setAttribute("width", "30");
+    controlText.setAttribute("height", "30");
+    controlText.setAttribute("alt", "The Pulpit Rock");
+    controlText.style.paddingTop= "5px";
+    controlText.style.paddingRight= "5px";
+    controlText.style.paddingLeft= "5px";
+    controlText.style.paddingBottom= "2px";
+    controlUI.appendChild(controlText);        
+
+    // Setup the click event listeners: simply set the map to Chicago.
+    controlUI.addEventListener('click', function() {
+      alert('aaaa');
+    });
+
+  }
+
 }
