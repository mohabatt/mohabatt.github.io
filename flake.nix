{
  description = "My Jekyll website";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        env = pkgs.bundlerEnv { name = "JekyllSite";
                                ruby = pkgs.ruby;
                                gemfile = ./Gemfile;
                                lockfile = ./Gemfile.lock;
                                gemset = ./gemset.nix;
                              };
      in
        {
          devShell = pkgs.mkShell {
            name = "JekyllSite";
            buildInputs = with pkgs;
              [ env
                bundler
                ruby
              ];
          };
        }
    );
}
