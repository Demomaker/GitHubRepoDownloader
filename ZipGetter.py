import sys


def get_zip_from_link(link):
    print(link + "/archive/master.zip")


def main():
    get_zip_from_link(sys.argv[1])


if __name__ == '__main__':
    main()
