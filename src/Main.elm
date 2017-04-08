module Main exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main : Program Never Model Msg
main =
    program
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Model =
    { user : User
    , posts : List Post
    }


type alias User =
    { username : String
    , name : Name
    , image : Image
    , friends : List Friend
    }


type Friend
    = FriendType User


type alias Image =
    String


type alias Name =
    { first : String
    , last : String
    }


type alias Post =
    { body : String
    , user : String
    , usersThatLiked : List User
    , comments : List Comment
    }


type Comment
    = CommentType Post


type Msg
    = SetFirstName String
    | SetLastName String


init : ( Model, Cmd Msg )
init =
    (Model
        (User
            "ryannhg"
            (Name "Ryan" "Haskell-Glatz")
            "http://i1.kym-cdn.com/entries/icons/facebook/000/013/564/aP2dv.jpg"
            []
        )
        []
    )
        ! []


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetFirstName firstName ->
            { model | user = (setFirstName model.user firstName) } ! []

        SetLastName lastName ->
            { model | user = (setLastName model.user lastName) } ! []


setFirstName : User -> String -> User
setFirstName user firstName =
    let
        name =
            user.name
    in
        { user | name = { name | first = firstName } }


setLastName : User -> String -> User
setLastName user lastName =
    let
        name =
            user.name
    in
        { user | name = { name | last = lastName } }


view : Model -> Html Msg
view model =
    div
        []
        [ text ("Full name: " ++ (fullName model.user.name))
        , div []
            [ input
                [ type_ "text"
                , onInput SetFirstName
                , value model.user.name.first
                ]
                []
            , input
                [ type_ "text"
                , onInput SetLastName
                , value model.user.name.last
                ]
                []
            ]
        ]


fullName : Name -> String
fullName name =
    name.first ++ " " ++ name.last


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
