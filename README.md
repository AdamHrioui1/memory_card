# Memory Game

## chooseOne()
this function display two buttons to chose which layout the user prefers, after the user select a layout (4x4 or 6x6), it  shuffle the array of cards (imgs_4x4 or imgs_6x6), then displays all the cards on the user screen

## displayCards()
this function remove the element "btns_container" that container the two first buttons, and create all the cards, then it append them the "cards_wrapper" element

## shuffleArray()
this function shuffle all the elements of the array we in its paramerter

## flipAllCards()
this function run once after the user chose its favorite layout, it turns all the cards in the front face (the image face), after 3 seconds it turns all the cards in the back face

## selectCard()
this function run everytime the user click ai any card, first the score increase, the it calls "showScore()" function to display the score in the screen, then it takes the selected card's id and store it in "id" variable, then it push this card id in the "two_selected_cards" array, this array contain the two selected cards, the it check if the "score % 2 === 0", if it "true", it check the first and the second element of the "two_selected_cards" are matched or not, if they matched, the "matched_cards_counter" increase, and it adds to the matched cards "flipped" className ti stay flipped, the it removes them eventListener to not compare this this matched cards another time

if the two elements of the "two_selected_cards" array are not matched, then it removes the "flipped" className, and each card of the two selected cards return to them first position

## isCardsMatches()
this function contain 3 parameters, the first and the second one are the selected cards, and the third one is the layout size, the function compare the first and the second parameters to check if they match or not

## youWin()
this function check if the "matched_cards_counter" is equals the half of the layout size, if it "true" that's mean the player win, else the play still not finished

## timer()
this function run after 3 seconds after the player chose it favorite layout, it count how much the player spend until it finish

## showTimer()
this function display the time on the user screen

## showScore()
this function display the score on the user screen
