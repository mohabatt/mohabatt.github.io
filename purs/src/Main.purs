module Main where


import Prelude

import Data.Array as Array
import Data.Array.ST as ArrayST
import Data.Maybe
import Data.Tuple (Tuple(..), fst, snd)
import Data.Tuple.Nested ((/\))
import Data.Traversable (traverse)
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Aff (launchAff_)
import Effect.Console as Console
import Effect.Random as Random
import Effect.Ref as Ref
import Effect.Timer (setInterval, clearInterval, IntervalId)
import Fetch (fetch)
import Web.DOM.NonElementParentNode (getElementById)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (Element)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.Location (origin)
import Web.HTML.Window (location, document)
import Yoga.JSON as JSON

import Deku.Core (Nut)
import Deku.Control as DC
import Deku.DOM as D
import Deku.DOM.Listeners as DL
import Deku.DOM.Attributes as DA
import Deku.Effect as DE
import Deku.Hooks ((<#~>))
import Deku.Hooks as DH
import Deku.Toplevel (runInBody, runInElement)
import FRP.Poll (Poll)


-- * Fetch the messages

type Message = { name :: String, message :: String }
type Messages = Array Message

eMessagesURL :: Effect String
eMessagesURL = do
  win <- window
  loc <- location win
  ori <- origin loc
  pure $ ori <> "/messages.json"

getMessages :: (Messages -> Effect Unit) -> (Message -> Effect Unit) -> Effect Unit
getMessages setMessages setActiveMessage = do
  messagesURL <- eMessagesURL
  launchAff_ do
    { json } <- fetch messagesURL {}
    mMessages :: Maybe Messages <- JSON.read_ <$> json
    case mMessages of
      Nothing -> pure unit
      Just messages -> do
        shuffledMessages <- liftEffect $ shuffle messages
        liftEffect $ setMessages shuffledMessages
        case Array.head shuffledMessages of
          Nothing -> pure unit
          Just msg -> liftEffect $ setActiveMessage msg

shuffle :: ∀ a. Array a -> Effect (Array a)
shuffle xs = map fst <<< Array.sortWith snd <$> traverse (\x -> Tuple x <$> Random.random) xs


-- * Get the messages element

messageElement :: Effect (Maybe Element)
messageElement = do
  win <- window
  htmlDoc <- document win
  getElementById "messages" <<< toNonElementParentNode <<< toDocument $ htmlDoc

-- * Get correct message

cardMaker :: Poll (Maybe Message) -> Poll String -> Effect Unit -> Effect Unit -> Nut
cardMaker activeMessage showClass onNextClick onPrevClick=
    D.div [ DA.klass_ "card" ]
    [ activeMessage <#~>
      case _ of
        Nothing -> DC.text_ "No message"
        Just msg ->
          D.div_
          [ D.p [DA.klass showClass] [DC.text_ msg.message]
          , D.footer [ DA.klass_ "card-footer"]
            [ D.button [DA.klass_ "card-button", DL.click_ \_ -> onPrevClick] [DC.text_ "Prev"]
            , D.button [DA.klass_ "card-button", DL.click_ \_ -> onNextClick] [DC.text_ "Next"]
            , D.div [ DA.klass_ "card-signature" ] [ D.p [DA.klass showClass] [DC.text_ msg.name ] ]
            ]
          ]
    ]


-- * Interval to update counter

interval :: { setActiveMessage :: Message -> Effect Unit
             , messagesRef :: Ref.Ref Messages
             , setCounter :: Int -> Effect Unit
             , counterRef :: Ref.Ref Int
             , setFadeClass :: String -> Effect Unit
             } -> Effect IntervalId
interval {setActiveMessage, messagesRef, setCounter, counterRef, setFadeClass} =
  setInterval 1000 do
    counter <- Ref.read counterRef
    (if counter == 0 then setFadeClass "text-show" else pure unit)
    (if counter == 29 then setFadeClass "text-fade" else pure unit)
    let nextCounter = (counter + 1) `mod` 30
    Ref.write nextCounter counterRef
    setCounter nextCounter
    (if nextCounter /= 0 then pure unit else do
      messages <- Ref.read messagesRef
      let updatedMessages = popAndPush messages
      Ref.write updatedMessages messagesRef
      case Array.head updatedMessages of
        Nothing -> pure unit
        Just msg -> setActiveMessage msg)



popAndPush :: forall a. Array a -> Array a
popAndPush arr = ArrayST.run do
    mutArr <- ArrayST.thaw arr
    mfst <- ArrayST.shift mutArr
    case mfst of
      Nothing -> pure mutArr
      Just fstElem -> do
        _ <- ArrayST.push fstElem mutArr
        pure mutArr


popAndPushReverse :: forall a. Array a -> Array a
popAndPushReverse arr = ArrayST.run do
    mutArr <- ArrayST.thaw arr
    mlst <- ArrayST.pop mutArr
    case mlst of
      Nothing -> pure mutArr
      Just lstElem -> do
        _ <- ArrayST.unshift lstElem mutArr
        pure mutArr


buttons :: {onNextClick :: Effect Unit, onPrevClick :: Effect Unit} -> Nut
buttons {onNextClick, onPrevClick} =
  D.div [ DA.klass_ "card-buttons"]
  [ D.button [DA.klass_ "card-button", DL.click_ \_ -> onPrevClick] [DC.text_ "Prev"],
    D.button [DA.klass_ "card-button", DL.click_ \_ -> onNextClick] [DC.text_ "Next"]
  ]


main :: Effect Unit
main = do
  mElem <- messageElement
  let runInFunc =
        case mElem of
          Nothing -> runInBody
          Just elem -> runInElement elem

  messageNumberRef <- Ref.new Nothing
  counterRef <- Ref.new 0
  messagesRef <- Ref.new []

  foo /\ setMessageNumber /\ messageNumber <- DE.useHot 0
  bar /\ setCounter /\ counter <- DE.useHot 0
  setActiveMessage /\ activeMessage <- DE.useState (Nothing :: Maybe Message)
  baz /\ setFadeClass /\ fadeClass <- DE.useHot "text-show"

  getMessages (\msgs -> Ref.write msgs messagesRef) (setActiveMessage <<< Just)
  _ <- interval { setActiveMessage: setActiveMessage <<< Just, messagesRef, setCounter, counterRef, setFadeClass }


  let onNextClick = do
        messages <- Ref.read messagesRef
        let updatedMessages = popAndPush messages
        Ref.write updatedMessages messagesRef
        case Array.head updatedMessages of
          Nothing -> pure unit
          Just msg -> do
            setActiveMessage $ Just msg
            Ref.write 0 counterRef

      onPrevClick = do
        messages <- Ref.read messagesRef
        let updatedMessages = popAndPushReverse messages
        Ref.write updatedMessages messagesRef
        case Array.head updatedMessages of
          Nothing -> pure unit
          Just msg -> do
            setActiveMessage $ Just msg
            Ref.write 0 counterRef

  runInFunc Deku.do
    D.div_ [
      cardMaker activeMessage fadeClass onNextClick onPrevClick
      ]
