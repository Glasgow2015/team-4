# Open Source Apiary Management Appplication

## Overview 
1: We need a mobile app for the reporting which will be done in the field that will work offline and sync with the server database when a network connection is 
detected and 
2: This app will be used in Tanzania to begin with, but will be used in other countries in the future. This means that all text in the user interface for both mobile app and 
website must be internationalized(enclosed in translation functions or otherwise NOT hardcoded)so that a text or xml file will provide localization strings for each language in the future.

## Module 1: Dashboard/home page
This is for the bee keepers to see basically their datas. It mirrors the functionality of the app.

## Module 2: Create a New Apiary
Here all datas can be seen

## Module 3: Creating Hives
In sum, it is about the location which is supported with a map

## Module 4: Creating an inspection
When bees are inspected. Inspection could be affected by various weather conditions.

## Module 5: Harvest and
When bees are harvested-month&year

## Module 6: Inspection report
Upon inspection/harvesting report would be given

##Resource Components
The system under development consists of;
 - Website: The pages to enter the data and the sheet, we have a lot of forms and creating accounts.
 - Server:  The structure of the data is created with an easier version which can be implemented in the 24 hours. Started adding the functionalities i.e. login account, every thing like all the things we have in the sheet.
 - Mobile Application: Anroid Gingerbread API 10. For each item on the dashborad we have list of questions. 
 - Navigation drawer: this can be slided from the left to the right.
 
 ##Scope of project
 The project will work offline and sync with the server database when a network connection is detected 
 
 ## Out of Scope:
 Underlying mechanism of recieving message is out of scope that is message could be recieved through a message bus, direct TCP or UDP connection.
 
 ## System Design
 Basically this is how the system would be designed. You need a login, each account is associated with Apiary, each apiary have any number of hives and then on each hives you either have harvested or inspected.
  
 ![alt text](https://github.com/Glasgow2015/team-4/blob/master/Project%20Design%20team4.jpg "System Design")
 
 