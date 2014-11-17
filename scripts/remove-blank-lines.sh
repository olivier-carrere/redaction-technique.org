#!/bin/bash
# Delete repeated empty lines from .dita files. Only edit files containing
# repeated empty lines to prevent make from building the whole project each
# time this script is run.

sha1 () {
    echo $(sha1sum $1 | awk '{print $1}')
}

for file in *.dita; do
    EDITED=/tmp/$(basename $file .dita).tmp
    cat -s $file > $EDITED
    ORIG_SHA1=$(sha1 $file)
    EDITED_SHA1=$(sha1 $EDITED)
    if [ $ORIG_SHA1 != $EDITED_SHA1 ]
    then
        mv $EDITED $file;
    fi
done
