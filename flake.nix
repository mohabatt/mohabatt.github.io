{
  description = "A Minimal Mistakes flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    ps-overlay.url = "github:thomashoneyman/purescript-overlay";
    mkSpagoDerivation.url = "github:jeslie0/mkSpagoDerivation";
  };

  outputs = { self, nixpkgs, flake-utils, ps-overlay, mkSpagoDerivation }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ ps-overlay.overlays.default
                       mkSpagoDerivation.overlays.default
                     ];
        };

        env = pkgs.bundlerEnv { name = "JekyllSite";
                                ruby = pkgs.ruby;
                                gemfile = ./Gemfile;
                                lockfile = ./Gemfile.lock;
                                gemset = ./gemset.nix;
                              };
      in
        {
          defaultPackage = pkgs.stdenv.mkDerivation {
            name = "JekyllSite";
            buildInputs = with pkgs; [ env bundler ruby ];
            installPhase = "echo foo";
          };

          devShell = pkgs.mkShell {
            name = "JekyllSite";
            buildInputs = with pkgs;
              [ env
                bundler
                bundix
                ruby
                purs-unstable
                purs-backend-es
                esbuild
                spago-unstable
                nodePackages.uglify-js
                purescript-language-server
                purs-tidy
                nodejs
              ];
          };
        }
    );
}
