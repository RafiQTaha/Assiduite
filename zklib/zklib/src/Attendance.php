<?php

namespace ZK;

use ZKLib;

class Attendance
{
    /**
     * @param ZKLib $self
     * @return array [uid, id, state, timestamp]
     */
    public function get(ZKLib $self,$date)
    {
        // dd("hi");
        $self->_section = __METHOD__;

        $command = Util::CMD_ATT_LOG_RRQ;
        $command_string = '';

        $session = $self->_command($command, $command_string, Util::COMMAND_TYPE_DATA);
        if ($session === false) {
            return [];
        }

        $attData = Util::recData($self);
        
        $attendance = [];
        if (!empty($attData)) {
            $attData = substr($attData, 10);

            while (strlen($attData) > 40) {
                $u = unpack('H78', substr($attData, 0, 39));
                $timestamp = Util::decodeTime(hexdec(Util::reverseHex(substr($u[1], 58, 8))));
                
				// if (($timestamp >= "$date 01:00:00") && ($timestamp <= "$date 23:59:00")) {
                    if (str_contains($timestamp, $date)) { 


                        $u1 = hexdec(substr($u[1], 4, 2));
                        $u2 = hexdec(substr($u[1], 6, 2));
                        $uid = $u1 + ($u2 * 256);
                        $id = hex2bin(substr($u[1], 8, 18));
                        $id = str_replace(chr(0), '', $id);
                        $state = hexdec(substr($u[1], 56, 2));
                $type = hexdec(Util::reverseHex(substr($u[1], 66, 2 )));

                    $attendance[] = [
                        'uid' => $uid,
                        'id' => $id,
                        'state' => $state,
                        'timestamp' => $timestamp,
                        'type' => $type
                    ];
                }
                

                $attData = substr($attData, 40);
            }

            
        }
        // dd($attendance);

        return $attendance;
    }

    public function get_new(ZKLib $self,$date)
    {
        $self->_section = __METHOD__;
       
        // $date  = '2023-07-17';
        $targetDate2 = date('Y-m-d', strtotime($date . ' +1 day'));

        $command = Util::CMD_ATT_LOG_RRQ;
        $command_string = '';

        $session = $self->_command($command, $command_string, Util::COMMAND_TYPE_DATA);
        if ($session === false) {
            return [];
        }
    
        $attData = Util::recData($self);
    
        $attendance = [];
        $startTime = time(); // Record start time
        if (!empty($attData)) {
            $attData = substr($attData, 10);
            $batchSize = 1000; // Adjust this based on your needs
            $recordLength = 40;
    
            while (strlen($attData) >= $batchSize * $recordLength) {
                $batchData = substr($attData, 0, $batchSize * $recordLength);
                $attData = substr($attData, $batchSize * $recordLength);

                if (time() - $startTime > 30) {
                    return []; // Return empty attendance
                }
                $batchAttendance = [];
    
                while (strlen($batchData) >= $recordLength) {
                    if (time() - $startTime > 30) {
                        return []; // Return empty attendance
                    }
                    $u = unpack('H78', substr($batchData, 0, $recordLength - 1));
                    $u1 = hexdec(substr($u[1], 4, 2));
                    $u2 = hexdec(substr($u[1], 6, 2));
                    $uid = $u1 + ($u2 * 256);
                    $id = hex2bin(substr($u[1], 8, 18));
                    $id = str_replace(chr(0), '', $id);
                    $state = hexdec(substr($u[1], 56, 2));
                    $timestamp = Util::decodeTime(hexdec(Util::reverseHex(substr($u[1], 58, 8))));
                    $type = hexdec(Util::reverseHex(substr($u[1], 66, 2 )));
    
                    // Check if the timestamp is on or after the target date
                    if (strtotime($timestamp) >= strtotime($date) && strtotime($timestamp) < strtotime($targetDate2)) {
                    // if (str_contains($timestamp, strtotime($targetDate))) { 
                        if (time() - $startTime > 30) {
                            return []; // Return empty attendance
                        }
                        $batchAttendance[] = [
                            'uid' => $uid,
                            'id' => $id,
                            'state' => $state,
                            'timestamp' => $timestamp,
                            'type' => $type
                        ];
                    }
    
                    $batchData = substr($batchData, $recordLength);
                }
    
                $attendance = array_merge($attendance, $batchAttendance);
            }
        }
    
        return $attendance;
    
    }

    /**
     * @param ZKLib $self
     * @return array [uid, id, state, timestamp]
     */
    public function get_date(ZKLib $self,$date1,$date2)
    {
        $self->_section = __METHOD__;

        $command = Util::CMD_ATT_LOG_RRQ;
        $command_string = '';

        $session = $self->_command($command, $command_string, Util::COMMAND_TYPE_DATA);
        if ($session === false) {
            return [];
        }

        $attData = Util::recData($self);

        $attendance = [];
        if (!empty($attData)) {
            $attData = substr($attData, 10);

            while (strlen($attData) > 40) {
                $u = unpack('H78', substr($attData, 0, 39));

                $u1 = hexdec(substr($u[1], 4, 2));
                $u2 = hexdec(substr($u[1], 6, 2));
                $uid = $u1 + ($u2 * 256);
                $id = hex2bin(substr($u[1], 8, 18));
                $id = str_replace(chr(0), '', $id);
                $state = hexdec(substr($u[1], 56, 2));
                $timestamp = Util::decodeTime(hexdec(Util::reverseHex(substr($u[1], 58, 8))));
                $type = hexdec(Util::reverseHex(substr($u[1], 66, 2 )));

				if ($timestamp >= "$date1 01:00:00" && $timestamp <= "$date2 23:59:00") {
                    $attendance[] = [
                        'uid' => $uid,
                        'id' => $id,
                        'state' => $state,
                        'timestamp' => $timestamp,
                        'type' => $type
                    ];
                }
                

                $attData = substr($attData, 40);
            }

        }

        return $attendance;
    }
    /**
     * @param ZKLib $self
     * @return array [uid, id, state, timestamp]
     */
    public function get_all(ZKLib $self)
    {
        $self->_section = __METHOD__;

        $command = Util::CMD_ATT_LOG_RRQ;
        $command_string = '';

        $session = $self->_command($command, $command_string, Util::COMMAND_TYPE_DATA);
        if ($session === false) {
            return [];
        }

        $attData = Util::recData($self);

        $attendance = [];
        if (!empty($attData)) {
            $attData = substr($attData, 10);

            while (strlen($attData) > 40) {
                $u = unpack('H78', substr($attData, 0, 39));

                $u1 = hexdec(substr($u[1], 4, 2));
                $u2 = hexdec(substr($u[1], 6, 2));
                $uid = $u1 + ($u2 * 256);
                $id = hex2bin(substr($u[1], 8, 18));
                $id = str_replace(chr(0), '', $id);
                $state = hexdec(substr($u[1], 56, 2));
                $timestamp = Util::decodeTime(hexdec(Util::reverseHex(substr($u[1], 58, 8))));
                $type = hexdec(Util::reverseHex(substr($u[1], 66, 2 )));

                    $attendance[] = [
                        'uid' => $uid,
                        'id' => $id,
                        'state' => $state,
                        'timestamp' => $timestamp,
                        'type' => $type
                    ];
                

                $attData = substr($attData, 40);
            }

        }

        return $attendance;
    }

    /**
     * @param ZKLib $self
     * @return bool|mixed
     */
    public function clear(ZKLib $self)
    {
        $self->_section = __METHOD__;

        $command = Util::CMD_CLEAR_ATT_LOG;
        $command_string = '';

        return $self->_command($command, $command_string);
    }
}
