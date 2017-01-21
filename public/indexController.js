app.controller("indexController", ["$scope", "$http", "$state",
  function(scope, http, state){

    scope.chatBoxMessages = ["Meta: Hello! I'm Meta. Please tell me what personal characteristics you would like to compare."
                    ];

    scope.textInMessageBox = "";

    var decisionTree = function(input)
    {
      var hasTrueFalseWord = input.includes("am" || "is" || "are");
      var sports = "sport" || "play" || "gym";
      var traveling = "travel" || "traveling" || "go out";
      var text = "Meta: ";

      if(input == "hello")
      {
        text += "Hello, pretty!";
      }
      else if(hasTrueFalseWord || input.includes(sports))
      {
        text += "Analyzing whether you are more sporty than your friend...";
        //call sport function
      }
      else if(hasTrueFalseWord || input.includes(traveling))
      {
        text += "Analyzing whether you are more a traveler than your friend...";
        //call travel function
      }
      else
      {
        text += "I'm sorry. I don't understand.\n"
        text += "I can analyze whether you are better than your friend at: \n"
        text += "1. Sport\n"
        text += "2. Travel\n"
      }

      return text;
    }

    scope.botRespond = function(input)
    {
      input = input.toLowerCase();
      scope.chatBoxMessages.push(decisionTree(input));
    }

    scope.messageStyler = function(message)
    {
      if (message.substring(0, 4) === "Meta")
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
