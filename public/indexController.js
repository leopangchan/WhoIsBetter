app.controller("indexController", ["$scope", "$http", "$state",
  function(scope, http, state){

    scope.chatBoxMessages = ["Queen: Hello! I'm Meta. ",
                            "Queen: query: insta <instagram account one> <instagram account two>",
                            "Queen: Please type \"Help\" to see what personality you can compare by."
                    ];

    scope.textInMessageBox = "";
    scope.currentUserInstagram = null;
    scope.currentCompetitorInstagram = null;

    scope.botRespond = function(input)
    {
      input = input.toLowerCase();
      scope.chatBoxMessages.push(decisionTree(input));
    }

    /*Goal: A function that gerenerate responeses based on the input
      Called by: botRespond()*/
    var decisionTree = function(input)
    {
      var hasTrueFalseWord = input.includes("am" || "is" || "are");
      var text = "Queen: ";
      var parsedQuery = null;

      if(input == "hello")
      {
        text += "Hello, pretty!";
      }
      else if (input === "help") {
        text += "I can analyze whether you are better than your friend at: \n"
        text += "1. Sport\n"
        text += "2. Travel\n"
        text += "3. Food\n"
      }
      else if(input.substring(0, 5) === "insta")//Query condition
      {
        parsedQuery = input.split(" ");

        if(parsedQuery[1] === null || parsedQuery[2] === null)
          scope.chatBoxMessages.push("You are missing one parameter. Please check.");
        else {
          scope.currentUserInstagram = parsedQuery[1];
          scope.currentCompetitorInstagram = parsedQuery[2];
          scope.acceptImages(parsedQuery[1], parsedQuery[2]);
        }
        text += "Image processing completed! You can start to compare you and your competitor.";
      }
      else if(hasTrueFalseWord)//Generate quetions
      {
        var sports = "sport" || "play" || "gym";
        var traveling = "travel" || "traveling" || "go out";
        var foody = "eat" || "food" || "dine out" || "meat" || "fruit" || "fat"

        if(input.includes(sports))
        {
          text += "Analyzing whether you are more sporty than your friend...";
          //TODO call analyze function
        }
        else if(input.includes(traveling))
        {
          text += "Analyzing whether you are more a traveler than your friend...";
          //TODO call analyze function
        }
        else if(input.includes(foody))
        {
          text += "Analyzing whether you have a bigger mouth than your friend...";
          //TODO call analyze function
        }
      }
      else
      {
        return text += "I'm sorry. I don't understand.\n"
      }

      return text;
    }

    /*Goal: it calls Khoa's python script that calls Zin's javascript that return classes that I can use.*/
    scope.acceptImages = function(setOneURL, setTwoURL)
    {
      if(scope.currentUserInstagram !== null && scope.currentCompetitorInstagram !== null)
      {
        scope.getImages(scope.currentUserInstagram, setOneURL);
        scope.getImages(scope.currentCompetitorInstagram, setTwoURL);
        scope.chatBoxMessages.push("Queen: I'm fetching images. Please wait!!");
        //TODO: Create loops for fetching
        //TODO: Classes Analysis
      }
    }

    scope.getImages = function(instagramAccount, savingPath)
    {
      fullInstagramURL = "https://www.instagram.com/" + instagramAccount;
      //TODO: Call Python script: Param: a instagram account and a path name where the images are saved.
    }

    scope.messageStyler = function(message)
    {
      if (message.substring(0, 5) === "Queen")
        return {color: "black"};
      else {
        return null;
      }
    }

    scope.sendAMessage = function()
    {
      var text = "Me: ";
      text += scope.textInMessageBox;
      scope.chatBoxMessages.push(text);
      scope.botRespond(scope.textInMessageBox);
    }
}]);
