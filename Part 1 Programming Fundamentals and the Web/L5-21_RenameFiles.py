import os
def rename_files():
    # get file names
    file_list = os.listdir(r"D:\Documents\Udacity Full Stack Web Developer\prank")
    print(file_list)

    os.chdir(r"D:\Documents\Udacity Full Stack Web Developer\prank")

    # for each file, rename
    for file_name in file_list:
        os.rename(file_name, file_name.translate(None, "1234567890"))

rename_files()
