module Main where

import Prelude

import Data.Maybe
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Aff (launchAff_)
import Effect.Console as Console
import Fetch (fetch)
import Web.HTML (window)
import Web.HTML.Location (origin)
import Web.HTML.Window (location)
import Web.DOM.Document (Document)
import Yoga.JSON as JSON


-- * Fetch the messages

type Message = { name :: String, message :: String }
type Messages = Array Message

eMessagesURL :: Effect String
eMessagesURL = do
  win <- window
  loc <- location win
  ori <- origin loc
  pure $ ori <> "/messages.json"

getMessages :: (Maybe Messages -> Effect Unit) -> Effect Unit
getMessages updateMessages = do
  messagesURL <- eMessagesURL
  launchAff_ do
    { json } <- fetch messagesURL {}
    mMessages :: Maybe Messages <- JSON.read_ <$> json
    liftEffect $ updateMessages mMessages



main :: Effect Unit
main = do
  getMessages Console.logShow
