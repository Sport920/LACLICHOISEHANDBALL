*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}    file://${CURDIR}/calendrier.html

*** Test Cases ***
Vérifier le titre du calendrier
    Open Browser    ${URL}    chrome
    Page Should Contain    Calendrier
    Close Browser
