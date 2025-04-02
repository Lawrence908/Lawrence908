Notes on SSH Client Configuration 
=================================
**Author:** Merlin Hansen  
**Date:** 	2020-11-16 / 2024-03-11

## Summary

This document provides information on configuring and using SSH clients to access CSCI servers from external non-VIU computers. Some of the topics include SSH keys and the SSH config file,

Note: when you have completed the procedures in this tutorial you may want to look at the tutorial on ssh tunnels.

* [Tutorial-sshTunnel.md](http://csci.viu.ca/~wesselsd/guides/Tutorial-sshTunnel.md)


## SSH Keys Resources

The following links have examples and general descriptions on how SSH keys work.

* [SSH Essentials](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)

## General information on CSCI services and ssh

* The CSCI server otter.csci.viu.ca (aka csci.viu.ca) acts as a gateway for connecting to CSCI internal services. You should not work on coursework directly on otter.csci.viu.ca. Instead you should always connect through otter.csci.viu.ca to a lab machine and perform your work on the lab machine. The configuration of SSH keys makes this easy and seamless.
  * First-year students have access to the "pup" computers in the CSCI first-year lab, B315-102.
    * Computer host names are pup1 through pup18 (pup19 is at the instructor's station)
  * Upper-year (second and higher) students have access to all CSCI lab computers
    * B315-102: pup1 - pup18 (pup19 is the instructor's station)
    * B315-115: cub1 - cub16 (cub17 is the instructor's station)
    * B315-215: kit1 - kit7
* SSH clients rely on fingerprinting target servers on initial connections in order to improve security on subsequent connections.
  * When making an initial connection to a new target computer you will be told the authenticity of the host cannot be established and asked if you want to continue; answer Yes.
  * If a similar warning message is displayed again for the same connection then something has changed and you should question it before allowing the connection. 
    * Example: When a new lab image is deployed the SSH fingerprint of the lab machines will change. If you know for sure that the target machine has changed fingerprints it is okay to proceed with the connection. 
    * Example: A malicious actor has managed to change something. Since you are not aware of any change you do not want to proceed with the connection. In this event you should talk to the CSCI Technician.

## CSCI use of SSH keys

The following scenarios are typical:

* Connecting from an off campus computer to a CSCI computer using SSH on the command line.
* Connecting from an off campus computer to a CSCI computer using an SSH based client application, such as PuTTY or WinSCP.

In both cases the purpose for connecting can be one or more of the following:

* For command line access to work on course work via a terminal
* To access the CSCI git server for assignment retrieval or submission
* To access internal specialized CSCI database or web servers for specific course work

For this tutorial the following is used throughout:

* An example user named "exstu" is used for the login username where needed. 
  * Replace "exstu" with your CSCI username in the example commands in this tutorial.
* Command line SSH client is used. Examples include:
  * Bash terminal on Linux or Apple OS X.
  * PowerShell prompt on Windows 10+.
    * Note: PowerShell has built in aliases that match most of the commands used in this tutorial. It is the recommended command-line tool to use on Windows.
  * Windows Terminal app (found in the Microsoft store and is published by Microsoft, and provides tabs and other great features)
    * Note: The app uses PowerShell as the command-line shell by default.
  * Command prompt on Windows 10+.
    * Note: Some commands in the examples are different in Windows vs Linux (ex: `dir` instead of `ls`).
  * Git Bash prompt, installed on Windows 10.
  * Linux Terminal on Windows (using Windows Subsystem for Linux - WSL), running the Bash shell.

### Accessing CSCI computers via SSH from off campus using SSH keys with command line SSH tools

SSH keys can be used to provide a safe secure method of connecting to CSCI servers without the need to provide a password. Further, a SSH `config` file can be used to specify various options automatically such as the username, what SSH key to use, etc. Combining the two provides an easy to use and safe SSH environment that can support having multiple keys, each used for different individual or groups of sites and servers.

#### References:

* [SSH Keys on Debian 9](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-debian-9)
* [SSH Keys on Debian 10](https://linuxize.com/post/how-to-set-up-ssh-keys-on-debian-10/)
* [SSH Config file](https://linuxize.com/post/using-the-ssh-config-file/)

#### Configuring SSH Keys

For the following procedure The "Bash" commands will work in a Linux or Mac OS X terminal, and the "PowerShell" commands will work on Windows 10+ using Windows PowerShell.

* On your home computer, confirm whether or not you have any SSH key pairs currently.
  * Check for any existing `id*` files in the `~/.ssh` folder.
    * Bash/PowerShell: `ls ~/.ssh`
      * Example files:
        * `id_rsa` - Contains the private key of the pair
        * `id_rsa.pub` - Contains the public key of the pair
    * Note: Overwriting any existing keys will break any existing configurations for servers using those key pairs.  The only way to recover from this is to generate new keys and replace the public key on the server.  To avoid this, use unique names for each key pair when generating them.
  * If the directory `~/.ssh` does not exist, create it.
    * Bash: `mkdir -p ~/.ssh && chmod 700 ~/.ssh`
    * Powwershell: `mkdir ~/.ssh`
* Use `ssh-keygen` to generate a new key pair to be used when connecting to CSCI servers. Do this on your own computer.
  * Bash: `ssh-keygen -t rsa -b 4096 -C "csci.viu.ca key pair" -f ~/.ssh/csci_id_rsa`
    * Enter a passphrase when prompted. 
      * Note: Although the passphrase is optional it is recommended, to avoid unauthorized access to your CSCI account.
    * A private and public key will be generated and stored in `~/.ssh/csci_id_rsa` and `~/.ssh/csci_id_rsa.pub`, respectively.
  * PowerShell: 
    * `cd ~/.ssh`
    * `ssh-keygen -t rsa -b 4096 -C "csci.viu.ca key pair" -f ./csci_id_rsa`
      * Enter a passphrase when prompted. 
        * Note: Although the passphrase is optional it is recommended, to avoid unauthorized access to your CSCI account.
      * A private and public key will be generated and stored in `~/.ssh/csci_id_rsa` and `~/.ssh/csci_id_rsa.pub`, respectively.
* Copy the newly created public SSH key to your account on the CSCI server, appending it to `~/.ssh/authorized_keys`.
  * Use either the `ssh-copy-id` command, or manually copy the public key file. 
    * Bash: `ssh-copy-id -i ~/.ssh/csci_id_rsa.pub exstu@csci.viu.ca`
    * PowerShell: does not have the `ssh-copy-id` command. Use the manual method below.
  * To manually copy the public key file into the `authorized_keys` file in your CSCI account, use the following command.
    * Bash/PowerShell: `cat ~/.ssh/csci_id_rsa.pub | ssh exstu@csci.viu.ca "mkdir -p ~/.ssh && chmod 700 ~/.ssh && touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && cat >> ~/.ssh/authorized_keys"`
      * Note: Replace 'exstu' in the above command with your CSCI username.
      * You will be prompted for your CSCI password. If successful you will get no further output.
      * FYI: the above single line command essentially does the following:
        * Takes the contents of your public key file on your home machine, and sends it to the csci server via ssh.
        * Ssh first attempts to create the `~/.ssh` folder, in case it does not exist,
        * Then set the correct permissions on the `~/.ssh` directory,
        * Then touches the `~/.ssh/authorized_keys` file, which will create an empty file if it did not exist,
        * then sets the correct permission on the `~/.ssh/authorized_keys` file,
        * and finally puts the contents or the public key received from your home machine into the `~/.ssh/authorized_keys` file.
    * Note: the `~/.ssh/authorized_keys` file can contain several public keys. It is this file that ssh looks for when you connect remotely. Ssh will use the keys in this file to attempt to match the identity on the incoming connection.
* Test connecting to the CSCI server using your account and the new key pair.
  * Bash/PowerShell: `ssh -i ~/.ssh/csci_id_rsa exstu@csci.viu.ca`
    * Enter the passphrase for the SSH key pair if/when prompted.
    * If successful you will be connected to otter.csci.viu.ca.

#### Configure default connection options for the CSCI gateway

An SSH `config` file can be used to specify options to use when connecting to various remote servers.  This includes specifying which SSH key pair (identity) and username to use when connecting to the CSCI server.

* On your home computer create an SSH `config` file or add CSCI specific entries to any existing one.
  * If the file `~/.ssh/config` does not exist, create it.
    * Bash:
      * `cd ~/.ssh`
      * `touch config`
      * `chmod 600 config`
    * PowerShell: `cd ~/.ssh`
  * Edit the `config` file and add the new configuration options for CSCI.
    * Bash: `vi ~/.ssh/config`
    * PowerShell: `notepad ./config.`
      * Answer 'yes' to create the file when prompted
    * Add the block-quoted text below. Note: 
      * If you have existing entries, put more specific entries towards the top and more general towards the bottom.
      * Change 'exstu' to your CSCI username

```
# Connection options for the CSCI gateway
Host otter otter.csci.viu.ca
    #Hostname otter.csci.viu.ca
    Hostname 104.128.240.2
    User exstu
    IdentityFile ~/.ssh/csci_id_rsa
    IdentitiesOnly yes
    AddKeysToAgent yes

# Connection options for all connections - '*' is a wildcard
Host *
    ServerAliveInterval 300
    ServerAliveCountMax 10
```

* Test the connection configuration by connecting to the CSCI server.
  * Bash/PowerShell: `ssh otter`
    * Enter the SSH key 'passphrase' if/when prompted
    * Note:
      * `otter` or `otter.csci.viu.ca` can be used as the target, as they all will match the CSCI host entry in the `config` file.
    * If you are prompted for a 'password' then the config file was not parsed correctly. Check your config file contents carefully.
  * Once connected to otter, you can connect to a chosen lab machine. Example:
    * `exstu@otter:~$ ssh pup10`
  * When you want to disconnect type `exit` to terminate the current connection.

#### Eliminating the need to enter the SSH passphrase

Mac OS X, Windows, and Linux all have the ability to store SSH keys so that you are not prompted for the SSH passphrase at each connection attempt.

* Mac OS X: the keychain can be used to store the key generated for CSCI.
  * Add the SSH private key to the keychain
    * `ssh-add -k ~/.ssh/csci_id_rsa`
      * Enter the key passphrase if/when prompted
  * Edit the `~/.ssh/config` file adding the following line right after the `AddKeysToAgent yes` entry shown above.

```
  UseKeychain yes
```
  * Test by establishing a new connection to the CSCI gateway server
    * `ssh otter`
    * Note: If successfully configured you will not be prompted for a passphrase or password.
* Windows: the ssh-agent can be used to store the key generated for CSCI.
  * Ensure the ssh-agent is enabled and running
    * Open a PowerShell window as Administrator (type 'powershell' in the Windows search and select 'Run as Administrator')
      * `Get-Service ssh-agent` should return information about the ssh-agent service
      * `Get-Service ssh-agent | Set-Service -Startup-Type 'Automatic'` will enable the service
      * `Start-Service ssh-agent` will start the service
      * `Get-Service ssh-agent` should now show the status as 'Running'
    * Close the Administrator PowerShell session window.
  * Add the SSH private key to the ssh agent using your original non-Administrator PowerShell session
    * `cd ~/.ssh`
    * `ssh-add -k ./csci_id_rsa`
      * Enter key passphrase if/when prompted
  * Test by establishing a new connection to the CSCI gateway server
    * `ssh otter`
    * Note: If successfully configured you will not be prompted for a passphrase or password.

#### Configuring SSH to directly access CSCI lab machines.

Students are asked not to perform work on otter.csci.viu.ca, the server you initially connect to when using ssh. This means that you much first use ssh to connect to otter.csci.viu.ca, and then connect from otter to one of the lab machines. SSH provides a couple of ways to shorten this process to one step.

##### Using ProxyJump on the command line

SSH provides the ProxyJump command line option to specify a Jumpbox (aka Bastion Host or Jump Host) to connect through when connecting to a machine behind a firewall. The ProxyJump option is -J; for example:

* Bash/PowerShell: `ssh -J exstu@otter.csci.viu.ca exstu@pup10.csci.viu.ca`
  * This tells SSH to first connect to otter.csci.viu.ca and then once that connection is established to connect to the lab machine pup10.
  * Replace 'exstu' with your username, and enter your password when requested.
    * Note: configuring SSH keys removed the need for entering your password. Refer to the sections above if you have not done this.

##### Using ProxyJump in the SSH config file

Using entries in the `~/.ssh/config` file on your home computer, you can configure SSH to use otter.csci.viu.ca as a proxy to connect to your preferred lab machine. Here is the process:

* If you have not configured SSH keys and default SSH options as shown in previous sections, do so before continuing.
* Modify your SSH configuration file `~/.ssh/config` as shown below
  * Add the following entries to the top of your `~/.ssh/config` file, before any other CSCI related entries. 
    * Note: change `exstu` to your CSCI username in all cases

```
Host cscijump
    #Hostname otter.csci.viu.ca
    Hostname 104.128.240.2
    User exstu
    IdentityFile ~/.ssh/csci_id_rsa
    IdentitiesOnly yes
    AddKeysToAgent yes

Host pup*.csci.viu.ca cub*.csci.viu.ca kit*.csci.viu.ca
    Hostname %h
    ProxyJump cscijump
    User exstu
    IdentityFile ~/.ssh/csci_id_rsa
    IdentitiesOnly yes
    AddKeysToAgent yes

Host pup* cub* kit* 
    Hostname %h.csci.viu.ca
    ProxyJump cscijump
    User exstu
    IdentityFile ~/.ssh/csci_id_rsa
    IdentitiesOnly yes
    AddKeysToAgent yes
```

* Test the connection to a CSCI lab machine
  * Bash/PowerShell: `ssh pup10`
    * You should be connected directly to the CSCI lab computer pup10, via otter.csci.viu.ca
    * The same will work for cub and kit lab machines.

### Using graphical SSH based programs such as PuTTY to access csci.viu.ca using SSH keys

Although using PuTTY and similar graphical front-ends to SSH appear convenient they are limited in what they can do compared to using the command line. Feel free to use such programs but it is recommended you also learn how to configure and use SSH on the command line, as described in the above sections.

#### References:

* [Download PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
  * Version 0.78 as of 2023-01-10
  * Note: Versions previous to 0.78 contain security flaws and do not easily support some of the options used to access CSCI services.
* [SSH Keys with PuTTY](https://support.hostway.com/hc/en-us/articles/115001509884-How-To-Use-SSH-Keys-on-Windows-Clients-with-PuTTY-)
* [SSH Keys with PuTTY](https://devops.ionos.com/tutorials/use-ssh-keys-with-putty-on-windows/)

#### Configuring PuTTY for SSH connections to CSCI

* Referencing either of the two tutorials linked above the following changes are recommended:
  * Download and install the latest stable version of PuTTY directly from the PuTTY site.
  * When generating the key change the number of bits to 4096.
  * Use a passphrase to protect your private key.
  * When saving the generated key it is recommended to save both the public and private key in a `.ssh` folder in your user folder.  
    * Example: if your username is `exstu`, save the file in `c:\Users\exstu\.ssh`.
    * You may have to create the .ssh folder
    * The advantage of using this folder is that many ssh programs on Windows will access this folder by default.
      * Examples include: Windows 10/11 built in ssh command line client, and Bash with Git for Windows.
  * When saving the generated key it is recommended to include a csci identifier in the file name.  For security reasons, separate keys should be used for each server you connect to. 
    * IE: Use one key-pair for CSCI, use another for sites like GitHub or GitLab, etc.
    * Example file name: `csci_id_rsa.ppk`
  * Use otter.csci.viu.ca for the Host Name to connect to.
  * Use port 22
  * In the Connection -> SSH -> Auth -> Credntials section select the key file created above for the "Private key file for authentication"
    * The tutorials were created using an earlier version of PuTTY and diff slightly on where to find this field.

#### Configuring PuTTY to connect directly to a lab machine

PuTTY versions prior to 0.78 do not directly the SSH ProxyJump option outlined below. Please ensure you have the latest stable version of PuTTy installed before proceeding.

* Complete the configuration of PuTTY for SSH connections to CSCI outlined in the preceding section before continuing.
* Create a new session in PuTTY targeting the desired lab computer; example pup10
  * Category -> Session
    * Host Name: pup10.csci.viu.ca
    * Port: 22
    * Connection type: SSH
  * Category -> Connection -> Data
    * Auto-login username: exstu (change to your CSCI username)
  * Category -> Connection -> Proxy
    * Proxy type: SSH to proxy and use port forwarding
    * Proxy hostname: otter.csci.viu.ca
    * Port: 22
    * Username: exstu (change to your CSCI username)
  * Enter "pup10" for the "Save Sessions" name and click Save
* Test the new session by opening it
  * Notes:
    * You will be prompted for passwords if you have not completed the above section and configured SSH keys for PuTTY
    * If this is your first PuTTY connection to this computer you will be prompted to accept the host fingerprint


## Accessing internal CSCI services from off campus using SSH

SSH can be used to access services that are not directly available from off campus. This includes CSCI services such as the student web server, databases, and assignment Git server. There is a tutorial that specifically deals with these scenarios. Once you have configured SSH keys and the SSH config file as shown in this tutorial, you may want to refer to [Tutorial-sshTunnel.md](http://csci.viu.ca/~wesselsd/guides/Tutorial-sshTunnel.md) depending on your specific needs.

