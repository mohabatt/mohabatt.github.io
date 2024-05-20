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

type Message = { name :: String
                 , message :: String
                 , images :: Maybe (Array String)
                 }

type Messages = Array Message

eMessagesURL :: Effect String
eMessagesURL = do
  win <- window
  loc <- location win
  ori <- origin loc
  pure $ ori <> "/messages.json"

getMessages :: { setMessages :: Messages -> Effect Unit
               , setActiveMessage :: Message -> Effect Unit
               } -> Effect Unit
getMessages {setMessages, setActiveMessage} = do
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

cardMaker :: { activeMessage :: Poll (Maybe Message)
             , showClass :: Poll String
             , onNextClick :: Effect Unit
             , onPrevClick :: Effect Unit
             , totalMessageCount :: Poll Int
             , messageNumber :: Poll Int
             } -> Nut
cardMaker { activeMessage, showClass, onNextClick, onPrevClick, totalMessageCount, messageNumber } =
    D.div [ DA.klass_ "card" ]
    [ activeMessage <#~>
      case _ of
        Nothing -> DC.text_ "No message"
        Just msg ->
          D.div_
          [ D.p [DA.klass showClass]
            [ DC.text_ msg.message ]
          , D.footer [ DA.klass_ "card-footer"]
            [ D.button [DA.klass_ "card-button", DL.click_ \_ -> onPrevClick]
              [ DC.text_ "Prev" ]
            , D.button [DA.klass_ "card-button", DL.click_ \_ -> onNextClick]
              [ DC.text_ "Next" ]
            , D.div [ DA.klass_ "card-signature" ]
              [ D.p [DA.klass showClass]
                [ DC.text_ msg.name ] ]
            ]
          , case msg.images of
               Nothing -> D.div_ []
               Just arr ->
                 let imageCount = Array.length arr
                 in D.div [ DA.klass_ "image-grid"] $ arr <#> \url ->
                 D.img [ DA.src_ url, DA.style_ $ "max-width: " <> (show $ 100 / imageCount) <> "%; max-height: 300px;" ] []
          , D.div [ DA.klass_ "message-count-container"]
            [ D.div [ DA.klass_ "message-count" ]
              [ messageNumber <#~> \n -> DC.text_ <<< show $ n + 1
              , DC.text_ " / "
              , totalMessageCount <#~> DC.text_ <<< show
              ]
            ]
          ]
      ]


-- * Interval to update counter

interval :: { onNextClick :: Effect Unit
            , messagesRef :: Ref.Ref Messages
            , setCounter :: Int -> Effect Unit
            , counterRef :: Ref.Ref Int
            , setFadeClass :: String -> Effect Unit
            } -> Effect IntervalId
interval { messagesRef, setCounter, counterRef, setFadeClass, onNextClick } =
  setInterval 1000 do
    counter <- Ref.read counterRef
    let nextCounter = (counter + 1) `mod` 30
    Ref.write nextCounter counterRef
    setCounter nextCounter
    when ((counter + 1) `mod` 30 == 0) onNextClick
    when ((counter `mod` 30) == 0) $ setFadeClass "text-show"
    when (counter == 29) $ setFadeClass "text-fade"


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

  counterRef <- Ref.new 0
  messagesRef <- Ref.new []
  messageNumberRef <- Ref.new 0

  setActiveMessage /\ activeMessage <- DE.useState (Nothing :: Maybe Message)
  foo /\ setMessageNumber /\ messageNumber <- DE.useHot 0
  bar /\ setCounter /\ counter <- DE.useHot 0
  baz /\ setFadeClass /\ fadeClass <- DE.useHot "text-show"
  foobar /\ setTotalMessageCount /\ totalMessageCount <- DE.useHot 0

  let onNextClick = do
        Ref.modify_ popAndPush messagesRef
        messages <- Ref.read messagesRef
        case Array.head messages of
          Nothing -> pure unit
          Just msg -> do
            setActiveMessage $ Just msg
            Ref.write 0 counterRef
            messageNumberVal <- Ref.read messageNumberRef
            messageCount <- Ref.read messagesRef >>= pure <<< Array.length
            setMessageNumber $ (messageNumberVal + 1) `mod` messageCount
            Ref.modify_ (\n -> n + 1) messageNumberRef

      onPrevClick = do
        Ref.modify_ popAndPushReverse messagesRef
        messages <- Ref.read messagesRef
        case Array.head messages of
          Nothing -> pure unit
          Just msg -> do
            setActiveMessage $ Just msg
            Ref.write 0 counterRef
            messageNumberVal <- Ref.read messageNumberRef
            messageCount <- Ref.read messagesRef >>= pure <<< Array.length
            setMessageNumber $ (messageNumberVal - 1) `mod` messageCount
            Ref.modify_ (\n -> n - 1) messageNumberRef

      setMessages msgs = do
        Ref.write msgs messagesRef
        setTotalMessageCount <<< Array.length $ msgs

  getMessages { setMessages
              , setActiveMessage: setActiveMessage <<< Just
              }

  _ <- interval { messagesRef
                , setCounter
                , counterRef
                , setFadeClass
                , onNextClick
                }

  runInFunc Deku.do
    D.div_ [ cardMaker { activeMessage
                       , showClass: fadeClass
                       , onNextClick
                       , onPrevClick
                       , totalMessageCount
                       , messageNumber
                       }
           ]
