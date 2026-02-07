#!/bin/bash

set -euo pipefail

projects_dir=
force=0

print-usage() {
  echo "USAGE: $0 <projects-dir>"
}

parse-args() {
  local rest=()
  local raw_projects_dir

  while [[ -n "${1:-}" ]]; do
    case "$1" in
      --help | -h)
        print-usage
        exit
        ;;
      --force | -f)
        force=1
        shift
        ;;
      -*)
        echo "ERROR: Unknown argument: $1"
        print-usage
        exit 1
        ;;
      *)
        rest+=("$1")
        shift
        ;;
    esac
  done

  raw_projects_dir="${rest[0]:-}"

  if [[ -z "$raw_projects_dir" ]]; then
    echo "ERROR: Please specify a directory where your projects are."
    print-usage
    exit 1
  fi

  projects_dir="$(readlink -f "$raw_projects_dir")"

  if ! [[ -d $projects_dir ]]; then
    echo "ERROR: Could not find projects directory: $projects_dir"
    exit 1
  fi
}

create-submodule() {
  local source="$1"
  local destination="$2"

  if [[ -e $source ]]; then
    if [[ $force -eq 1 ]]; then
      echo "FORCE creating symlink $source => $destination"
      ln -sf "$destination" "$source"
    else
      echo "NOT creating symlink $source => $destination ($source already exists; please remove it or pass --force)"
    fi
  elif ! [[ -e $destination ]]; then
    echo "NOT creating symlink $source => $destination ($destination does not exist)"
  else
    echo "Creating symlink $source => $destination"
    ln -s "$destination" "$source"
  fi
}

create-submodules() {
  local source
  local destination

  if [[ -f .submodules ]]; then
    echo "### Setting up submodules ###"
    # shellcheck disable=SC2016
    while read -r source destination; do
      create-submodule "$source" "${destination/@/$projects_dir}"
    done < .submodules
    echo
  fi
}

setup-submodules() {
  local source
  local destination

  if [[ -f .submodules ]]; then
    # shellcheck disable=SC2016
    while read -r source destination; do
      echo
      echo "------------------------------------------"
      (cd "$source" && echo "(In $PWD)" $'\n' && ./scripts/setup.sh "$projects_dir")
    done < .submodules
  fi
}

setup() {
  create-submodules "$PWD"

  echo "### Setting up git-lfs ###"
  git lfs install

  echo
  echo "Done!"

  setup-submodules
}

main() {
  parse-args "$@"
  setup
}

main "$@"
